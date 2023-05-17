import JwtConfig from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { IRefreshTokenRepository } from '@users/repositories/IRefreshTokenRepository'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

type CreateLoginDTO = {
    email: string
    password: string
}

type IResponse = {
    user: User
    accessToken: string
    refreshToken: string
}

@injectable()
export class CreateLoginUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('RefreshTokenRepository')
        private refreshTokenRepository: IRefreshTokenRepository,
    ) {}

    async execute({ email, password }: CreateLoginDTO): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new AppError('User email/password combination incorrect')
        }

        const passwordChecked = await compare(password, user.password)
        if (!passwordChecked) {
            throw new AppError('User email/password combination incorrect')
        }

        const accessToken = sign({}, JwtConfig.jwt.secret, {
            subject: user.id,
            expiresIn: JwtConfig.jwt.expiresIn,
        })

        const expires = new Date(Date.now() + JwtConfig.refreshToken.duration)

        const refreshToken = sign({}, JwtConfig.refreshToken.secret, {
            subject: user.id,
            expiresIn: JwtConfig.refreshToken.expiresIn,
        })

        await this.refreshTokenRepository.create({
            token: refreshToken,
            expires,
            user_id: user.id,
            valid: true,
        })

        return {
            user,
            accessToken,
            refreshToken,
        }
    }
}

import JwtConfig from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
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
    token: string
}

@injectable()
export class CreateLoginUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
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

        const token = sign({}, JwtConfig.jwt.secret, {
            subject: user.id,
            expiresIn: JwtConfig.jwt.expiresIn,
        })

        return {
            user,
            token,
        }
    }
}

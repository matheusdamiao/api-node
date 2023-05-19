import { AppError } from '@shared/errors/AppError'
import { IRefreshTokenRepository } from '@users/repositories/IRefreshTokenRepository'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import authConfig from '@config/auth'

type CreateAccessAndRefreshTokenDTO = {
    user_id: string
    refresh_token: string
}

type IResponse = {
    user: User
    accessToken: string
    refreshToken: string
}

@injectable()
export class CreateAccessAndRefreshTokenUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('RefreshTokenRepository')
        private refreshTokenRepository: IRefreshTokenRepository,
    ) {}

    public async execute({
        refresh_token,
        user_id,
    }: CreateAccessAndRefreshTokenDTO): Promise<IResponse> {
        const user = await this.usersRepository.findById(user_id)
        if (!user) {
            throw new AppError('User not found', 404)
        }
        const refreshTokenExists =
            await this.refreshTokenRepository.findByToken(refresh_token)
        if (!refreshTokenExists) {
            throw new AppError('Refresh token is required', 401)
        }

        const dateNow = new Date().getTime()
        if (
            !refreshTokenExists.valid ||
            refreshTokenExists.expires.getTime() < dateNow
        ) {
            throw new AppError('Refresh token is invalid/expired', 401)
        }

        await this.refreshTokenRepository.invalidate(refreshTokenExists)

        const accessToken = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        })

        const expires = new Date(Date.now() + authConfig.refreshToken.duration)

        const refreshToken = sign({}, authConfig.refreshToken.secret, {
            subject: user.id,
            expiresIn: authConfig.refreshToken.expiresIn,
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

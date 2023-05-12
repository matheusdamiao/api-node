import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { compare, hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

type UpdateProfileDTO = {
    userId: string
    name: string
    email: string
    password?: string
    old_password?: string
}

@injectable()
export class UpdateProfileUseCase {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}

    async execute({
        userId,
        name,
        email,
        password,
        old_password,
    }: UpdateProfileDTO): Promise<User> {
        const user = await this.usersRepository.findById(userId)
        if (!user) {
            throw new AppError('User not found', 404)
        }
        const userUpdateEmail = await this.usersRepository.findByEmail(email)
        if (userUpdateEmail && userUpdateEmail.id !== userId) {
            throw new AppError('There is already one user with this e-mail')
        }

        if (password && old_password) {
            const passwordChecked = await compare(old_password, user.password)
            if (!passwordChecked) {
                throw new AppError('Old password doesnt match')
            }

            user.password = await hash(password, 10)
        }

        user.name = name
        user.email = email
        return this.usersRepository.save(user)
    }
}

import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { UsersRepository } from '@users/repositories/UsersRepository'
import { CreateUserUseCase } from '@users/useCases/createUser/CreateUserUseCase'
import { container } from 'tsyringe'

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
)

container.registerSingleton('CreateUserUseCase', CreateUserUseCase)

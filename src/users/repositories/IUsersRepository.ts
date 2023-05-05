import { User } from '@users/entities/User'

export type CreateUserDTO = {
    name: string
    email: string
    password: string
    isAdmin: boolean
    role: User
}

export type PaginateParams = {
    page: number
    skip: number
    take: number
}

export type UsersPaginateProperties = {
    per_page: number
    total: number
    current_page: number
    data: User[]
}

export interface IUsersRepository {
    create({
        name,
        email,
        password,
        isAdmin,
        role,
    }: CreateUserDTO): Promise<User>
    save(role: User): Promise<User>
    findAll({
        page,
        skip,
        take,
    }: PaginateParams): Promise<UsersPaginateProperties>
    findById(id: string): Promise<User | null>
    findByName(name: string): Promise<User | null>
    delete(role: User): Promise<void>
}
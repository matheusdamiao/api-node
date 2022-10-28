import { Role } from '@roles/entities/Role'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

type ShowRolesParams = {
    id: string
}

export class ShowRolesUseCase {
    constructor(private rolesRepository: RolesRepository) {}
    async execute({ id }: ShowRolesParams): Promise<Role> {
        const role = await this.rolesRepository.findById(id)
        if (!role) {
            throw new AppError('Role not found', 404)
        }
        return role
    }
}

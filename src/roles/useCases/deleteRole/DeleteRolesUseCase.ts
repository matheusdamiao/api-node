import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

type DeleteRolesDTO = {
    id: string
}

export class DeleteRolesUseCase {
    constructor(private rolesRepository: RolesRepository) {}
    async execute({ id }: DeleteRolesDTO): Promise<void> {
        const role = await this.rolesRepository.findById(id)
        if (!role) {
            throw new AppError('Role not found', 404)
        }

        return this.rolesRepository.delete(role)
    }
}

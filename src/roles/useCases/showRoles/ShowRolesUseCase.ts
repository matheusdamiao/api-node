import { Role } from '@roles/entities/Role'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

type ShowRolesParams = {
    id: string
}

@injectable()
export class ShowRolesUseCase {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}
    async execute({ id }: ShowRolesParams): Promise<Role> {
        const role = await this.rolesRepository.findById(id)
        if (!role) {
            throw new AppError('Role not found', 404)
        }
        return role
    }
}

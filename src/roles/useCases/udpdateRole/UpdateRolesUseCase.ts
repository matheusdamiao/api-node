import { Role } from '@roles/entities/Role'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

type UpdateRolesDTO = {
    id: string
    name: string
}

@injectable()
export class UpdateRolesUseCase {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}
    async execute({ id, name }: UpdateRolesDTO): Promise<Role> {
        const role = await this.rolesRepository.findById(id)
        if (!role) {
            throw new AppError('Role not found', 404)
        }
        const roleWithSameName = await this.rolesRepository.findByName(name)
        if (roleWithSameName && role.name !== roleWithSameName.name) {
            throw new AppError('Role name not informed or already in use')
        }
        role.name = name

        return this.rolesRepository.save(role)
    }
}

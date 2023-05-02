import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

type DeleteRolesDTO = {
    id: string
}
@injectable()
export class DeleteRolesUseCase {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}
    async execute({ id }: DeleteRolesDTO): Promise<void> {
        const role = await this.rolesRepository.findById(id)
        if (!role) {
            throw new AppError('Role not found', 404)
        }

        return this.rolesRepository.delete(role)
    }
}

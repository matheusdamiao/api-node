import { RolesRepository } from '@roles/repositories/RolesRepository'
import { DeleteRolesController } from './DeleteRolesController'
import { DeleteRolesUseCase } from './DeleteRolesUseCase'

const rolesRepository = RolesRepository.getInstance()
const deleteRolesUseCase = new DeleteRolesUseCase(rolesRepository)
export const deleteRolesController = new DeleteRolesController(
    deleteRolesUseCase,
)

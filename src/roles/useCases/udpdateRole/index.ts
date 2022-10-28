import { RolesRepository } from '@roles/repositories/RolesRepository'
import { UpdateRolesController } from './UpdateRolesController'
import { UpdateRolesUseCase } from './UpdateRolesUseCase'

const rolesRepository = RolesRepository.getInstance()
const updateRolesUseCase = new UpdateRolesUseCase(rolesRepository)
export const updateRolesController = new UpdateRolesController(
    updateRolesUseCase,
)

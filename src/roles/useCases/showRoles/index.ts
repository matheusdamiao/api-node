import { RolesRepository } from '@roles/repositories/RolesRepository'
import { ShowRolesController } from './ShowRolesController'
import { ShowRolesUseCase } from './ShowRolesUseCase'

const rolesRepository = RolesRepository.getInstance()
const showRolesUseCase = new ShowRolesUseCase(rolesRepository)
export const showRolesController = new ShowRolesController(showRolesUseCase)

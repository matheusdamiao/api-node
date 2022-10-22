import { RolesRepository } from '@roles/repositories/RolesRepository'
import { ListRoleController } from './ListRoleController'
import { ListRolesUseCase } from './ListRolesUseCase'

const rolesRepository = new RolesRepository()
const listRolesUseCase = new ListRolesUseCase(rolesRepository)
export const listRoleController = new ListRoleController(listRolesUseCase)

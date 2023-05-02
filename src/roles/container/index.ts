import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { DeleteRolesController } from '@roles/useCases/deleteRole/DeleteRolesController'
import { ListRoleController } from '@roles/useCases/listRoles/ListRoleController'
import { ShowRolesController } from '@roles/useCases/showRoles/ShowRolesController'
import { UpdateRolesController } from '@roles/useCases/udpdateRole/UpdateRolesController'
import { container } from 'tsyringe'

container.registerSingleton<IRolesRepository>(
    'RolesRepository',
    RolesRepository,
)

container.registerSingleton('CreateRolerController', CreateRoleController)
container.registerSingleton('ListRoleController', ListRoleController)
container.registerSingleton('ShowRolesController', ShowRolesController)
container.registerSingleton('UpdateRolesController', UpdateRolesController)
container.registerSingleton('DeleteRolesController', DeleteRolesController)

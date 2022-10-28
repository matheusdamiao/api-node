import { createRoleController } from '@roles/useCases/createRole'
import { deleteRolesController } from '@roles/useCases/deleteRole'
import { listRoleController } from '@roles/useCases/listRoles'
import { showRolesController } from '@roles/useCases/showRoles'
import { updateRolesController } from '@roles/useCases/udpdateRole'
import { Router } from 'express'

const rolesRouter = Router()

rolesRouter.post('/', (request, response) => {
    return createRoleController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
    return listRoleController.handle(request, response)
})

rolesRouter.get('/:id', (request, response) => {
    return showRolesController.handle(request, response)
})

rolesRouter.put('/:id', (request, response) => {
    return updateRolesController.handle(request, response)
})

rolesRouter.delete('/:id', (request, response) => {
    return deleteRolesController.handle(request, response)
})

export { rolesRouter }

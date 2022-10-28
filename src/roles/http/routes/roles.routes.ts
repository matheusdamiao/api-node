import { createRoleController } from '@roles/useCases/createRole'
import { listRoleController } from '@roles/useCases/listRoles'
import { showRolesController } from '@roles/useCases/showRoles'
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

export { rolesRouter }

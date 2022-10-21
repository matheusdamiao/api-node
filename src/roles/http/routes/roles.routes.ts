import { RolesRepository } from '@roles/repositories/RolesRepository'
import { createRoleController } from '@roles/useCases/createRole'
import { Router } from 'express'

const rolesRouter = Router()
const rolesRepository = new RolesRepository()

rolesRouter.post('/', (request, response) => {
    return createRoleController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
    const roles = rolesRepository.findAll()

    return response.json(roles)
})

export { rolesRouter }

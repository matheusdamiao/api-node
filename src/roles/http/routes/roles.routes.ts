import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import { container } from 'tsyringe'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { ListRoleController } from '@roles/useCases/listRoles/ListRoleController'
import { ShowRolesController } from '@roles/useCases/showRoles/ShowRolesController'
import { UpdateRolesController } from '@roles/useCases/udpdateRole/UpdateRolesController'
import { DeleteRolesController } from '@roles/useCases/deleteRole/DeleteRolesController'

const rolesRouter = Router()

const createRoleController = container.resolve(CreateRoleController)
const listRoleController = container.resolve(ListRoleController)
const showRolesController = container.resolve(ShowRolesController)
const updateRolesController = container.resolve(UpdateRolesController)
const deleteRolesController = container.resolve(DeleteRolesController)

rolesRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
        }),
    }),
    (request, response) => {
        return createRoleController.handle(request, response)
    },
)

rolesRouter.get(
    '/',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
            limit: Joi.number(),
        }),
    }),
    (request, response) => {
        return listRoleController.handle(request, response)
    },
)

rolesRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().uuid().required(),
        }),
    }),
    (request, response) => {
        return showRolesController.handle(request, response)
    },
)

rolesRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().uuid().required(),
        }),
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
        }),
    }),
    (request, response) => {
        return updateRolesController.handle(request, response)
    },
)

rolesRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().uuid().required(),
        }),
    }),
    (request, response) => {
        return deleteRolesController.handle(request, response)
    },
)

export { rolesRouter }

import { createRoleController } from '@roles/useCases/createRole'
import { deleteRolesController } from '@roles/useCases/deleteRole'
import { listRoleController } from '@roles/useCases/listRoles'
import { showRolesController } from '@roles/useCases/showRoles'
import { updateRolesController } from '@roles/useCases/udpdateRole'
import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

const rolesRouter = Router()

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

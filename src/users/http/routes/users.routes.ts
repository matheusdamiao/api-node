import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'

const usersRouter = Router()

const createUserController = container.resolve(CreateUserController)

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            isAdmin: Joi.boolean().required(),
            role: Joi.string().uuid().required(),
        }),
    }),
    (response, request) => {
        return createUserController.handle(response, request)
    },
)

export { usersRouter }

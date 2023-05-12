import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated'
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController'
import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'
import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { UpdateAvatarController } from '@users/useCases/updateAvatar/UpdateAvatarController'

const usersRouter = Router()

const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const updateAvatarController = container.resolve(UpdateAvatarController)

const upload = multer(uploadConfig)

usersRouter.post(
    '/',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            isAdmin: Joi.boolean().required(),
            roleId: Joi.string().uuid().required(),
        }),
    }),
    (response, request) => {
        return createUserController.handle(response, request)
    },
)

usersRouter.get(
    '/',
    isAuthenticated,
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
            limit: Joi.number(),
        }),
    }),
    (response, request) => {
        return listUsersController.handle(request, response)
    },
)

usersRouter.post(
    '/login',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),
    (response, request) => {
        return createLoginController.handle(response, request)
    },
)

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    (response, request) => {
        return updateAvatarController.handle(response, request)
    },
)

export { usersRouter }

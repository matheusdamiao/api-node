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
import { ShowProfileController } from '@users/useCases/showProfile/ShowProfileController'
import { UpdateProfileController } from '@users/useCases/updateProfile/UpdateProfileController'

const usersRouter = Router()

const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const updateAvatarController = container.resolve(UpdateAvatarController)
const showProfileController = container.resolve(ShowProfileController)
const updateProfileController = container.resolve(UpdateProfileController)

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

usersRouter.get('/profile', isAuthenticated, (response, request) => {
    return showProfileController.handle(response, request)
})

usersRouter.put(
    '/profile',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string().optional(),
            // Password confirmation is not required, but if a password exists,
            // then, password becomes required
            password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
        }),
    }),
    (response, request) => {
        return updateProfileController.handle(response, request)
    },
)

export { usersRouter }

import { Router } from 'express'
import { rolesRouter } from '@roles/http/routes/roles.routes'
import { usersRouter } from '@users/http/routes/users.routes'

const routes = Router()
routes.get('/', (request, response, next) => {
    return response.json({ message: 'Olá Dev!' })
})

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)

export { routes }

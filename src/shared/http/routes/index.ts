import { AppError } from '@shared/errors/AppError'
import { Router } from 'express'

const routes = Router()
routes.get('/', (request, response, next) => {
    throw new Error('Acesso negado!')
    return response.json({ message: 'Olá Dev!' })
})

export { routes }

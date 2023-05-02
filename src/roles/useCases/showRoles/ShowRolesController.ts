import { Request, Response } from 'express'
import { ShowRolesUseCase } from './ShowRolesUseCase'
import { container } from 'tsyringe'

export class ShowRolesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const showRoleUseCase = container.resolve(ShowRolesUseCase)
        const { id } = request.params
        const role = await showRoleUseCase.execute({ id })

        return response.status(201).json(role)
    }
}

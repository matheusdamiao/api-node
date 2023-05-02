import { Request, Response } from 'express'
import { UpdateRolesUseCase } from './UpdateRolesUseCase'
import { container } from 'tsyringe'

export class UpdateRolesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const updateRolesUseCase = container.resolve(UpdateRolesUseCase)
        const { id } = request.params
        const { name } = request.body
        const role = await updateRolesUseCase.execute({ id, name })

        return response.status(201).json(role)
    }
}

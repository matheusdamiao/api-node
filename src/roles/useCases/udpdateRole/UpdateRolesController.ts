import { Request, Response } from 'express'
import { UpdateRolesUseCase } from './UpdateRolesUseCase'

export class UpdateRolesController {
    constructor(private updateRolesUseCase: UpdateRolesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const { name } = request.body
        const role = await this.updateRolesUseCase.execute({ id, name })

        return response.status(201).json(role)
    }
}

import { Request, Response } from 'express'
import { ShowRolesUseCase } from './ShowRolesUseCase'

export class ShowRolesController {
    constructor(private showRoleUseCase: ShowRolesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const role = await this.showRoleUseCase.execute({ id })

        return response.status(201).json(role)
    }
}

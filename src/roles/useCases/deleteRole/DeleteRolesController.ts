import { Request, Response } from 'express'
import { DeleteRolesUseCase } from './DeleteRolesUseCase'

export class DeleteRolesController {
    constructor(private deleteRolesUseCase: DeleteRolesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        await this.deleteRolesUseCase.execute({ id })

        return response.status(204).send()
    }
}

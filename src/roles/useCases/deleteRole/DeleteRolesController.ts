import { Request, Response } from 'express'
import { DeleteRolesUseCase } from './DeleteRolesUseCase'
import { container } from 'tsyringe'

export class DeleteRolesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const deleteRolesUseCase = container.resolve(DeleteRolesUseCase)
        const { id } = request.params
        await deleteRolesUseCase.execute({ id })

        return response.status(204).send()
    }
}

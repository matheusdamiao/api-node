import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createRoleUseCase = container.resolve(CreateUserUseCase)
        const { name, email, password, isAdmin, roleId } = req.body
        const user = await createRoleUseCase.execute({
            name,
            email,
            password,
            isAdmin,
            roleId,
        })
        return res.status(201).json(instanceToInstance(user))
    }
}

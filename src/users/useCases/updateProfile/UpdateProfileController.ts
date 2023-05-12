import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { container } from 'tsyringe'
import { UpdateProfileUseCase } from './UpdateProfileUseCase'

export class UpdateProfileController {
    async handle(req: Request, res: Response): Promise<Response> {
        const updateProfileUseCase = container.resolve(UpdateProfileUseCase)
        const userId = req.user.id
        const { name, email, password, old_password } = req.body
        const user = await updateProfileUseCase.execute({
            name,
            email,
            password,
            old_password,
            userId,
        })
        return res.json(instanceToInstance(user))
    }
}

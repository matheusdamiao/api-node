import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { Secret, decode, verify } from 'jsonwebtoken'


type JwtPayloadProps = {
    sub: string
}

export const addUserInfoToRequests = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const authHeader = request.headers.authorization
    if (!authHeader) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Access token not present',
        })
    }

    const token = authHeader.replace('Bearer ', '')
    if (!token) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Access token not present',
        })
    }
    try {
        const decodedToken = decode(token)
        const { sub } = decodedToken as JwtPayloadProps
        request.user = { id: sub }
        return next()
    } catch (error) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Access token not present',
        })
    }
}

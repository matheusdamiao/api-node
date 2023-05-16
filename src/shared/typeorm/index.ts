import { Role } from '@roles/entities/Role'
import { DataSource } from 'typeorm'
import { CreateRolesTable1666792375084 } from './migrations/1666792375084-CreateRolesTable'
import { CreateUsersTable1683038820881 } from './migrations/1683038820881-CreateUsersTable'
import { AddRoleIdToUsersTable1683039918811 } from './migrations/1683039918811-AddRoleIdToUsersTable'
import { User } from '@users/entities/User'
import { CreateRefreshTokensTable1684184365822 } from './migrations/1684184365822-CreateRefreshTokensTable'
import { RefreshToken } from '@users/entities/RefreshToken'

export const dataSource = new DataSource({
    type: 'sqlite',
    database: './db.sqlite',
    entities: [Role, User, RefreshToken],
    migrations: [
        CreateRolesTable1666792375084,
        CreateUsersTable1683038820881,
        AddRoleIdToUsersTable1683039918811,
        CreateRefreshTokensTable1684184365822,
    ],
})

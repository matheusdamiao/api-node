import { DataSource } from 'typeorm'
import { CreateRolesTable1666792375084 } from './migrations/1666792375084-CreateRolesTable'

export const dataSource = new DataSource({
    type: 'sqlite',
    database: './db.sqlite',
    entities: [],
    migrations: [CreateRolesTable1666792375084],
})

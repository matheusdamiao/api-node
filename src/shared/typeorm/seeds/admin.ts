import { v4 as uuidv4 } from 'uuid'
import { dataSource } from '@shared/typeorm'
import { hash } from 'bcryptjs'

async function create() {
    const connection = await dataSource.initialize()
    // Create Role
    const roleId = uuidv4()
    await connection.query(`
        INSERT INTO roles(id, name)
        values('${roleId}', 'T.I')
    `)

    // Create User
    const userId = uuidv4()
    const password = await hash('12345', 10)
    await connection.query(`
        INSERT INTO users(id, name, email, password, "isAdmin", roleId)
        values('${userId}', 'admin', 'a@a.com.br', '${password}', 'true', '${roleId}' )
    `)

    await connection.destroy()
}

create().then(() => console.log('User admin created'))

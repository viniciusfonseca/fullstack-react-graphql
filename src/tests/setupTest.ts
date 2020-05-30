import { createContainer } from "../services/createContainer"
import { Connection, Repository } from "typeorm"
import { DB_CONNECTION } from "../services/bindDBConnection"
import { createApolloServer } from "../graphql/createApolloServer"
import { createTestClient } from "apollo-server-testing"
import { CustomerEntity } from "../entities/CustomerEntity"
import { AddressEntity } from "../entities/AddressEntity"
import { UsersResolver } from "../resolvers/UsersResolver"
import { CustomersResolver } from "../resolvers/CustomersResolver"
import { UserEntity } from "../entities/UserEntity"

export async function setupTest() {
    
    const container = await createContainer()
    const connection = container.get<Connection>(DB_CONNECTION)
    const server = await createApolloServer(container)
    const client = createTestClient(server)

    const repositories = {
        customers: connection.getRepository(CustomerEntity),
        addresses: connection.getRepository(AddressEntity),
        users: connection.getRepository(UserEntity)
    }

    const usersResolver = container.get<UsersResolver>(UsersResolver)
    const customersResolver = container.get<CustomersResolver>(CustomersResolver)
    await Promise.all([
        usersResolver.userRegister({
            email: 'admin@example.com',
            password: '123456',
            confirm_password: '123456'
        }),
        customersResolver.customerRegister({
            name: 'customer',
            email: 'customer@example.com',
            password: '123456',
            confirm_password: '123456',
            address: {
                city: 'foo',
                street: 'bar',
                number: '123'
            }
        })
    ])
    const [
        { token: adminToken },
        { token: customerToken }
    ] = await Promise.all([
        usersResolver.userLogin({
            email: 'admin@example.com',
            password: '123456'
        }),
        customersResolver.customerLogin({
            email: 'customer@example.com',
            password: '123456',
        })
    ])

    const tokens = {
        adminToken,
        customerToken
    }

    return {
        container,
        connection,
        server,
        client,
        repositories,
        tokens
    }
}
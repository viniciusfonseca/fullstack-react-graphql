import { createContainer } from "../services/createContainer"
import { Connection } from "typeorm"
import { DB_CONNECTION } from "../services/bindDBConnection"
import { createApolloServer } from "../graphql/createApolloServer"
import { createTestClient } from "apollo-server-testing"
import { CustomerEntity } from "../entities/CustomerEntity"
import { AddressEntity } from "../entities/AddressEntity"

export async function setupTest() {
    const container = await createContainer()
    const connection = container.get<Connection>(DB_CONNECTION)
    const server = await createApolloServer(container)
    const client = createTestClient(server)

    const repositories = {
        customers: connection.getRepository(CustomerEntity),
        addresses: connection.getRepository(AddressEntity)
    }

    return {
        container,
        connection,
        server,
        client,
        repositories
    }
}
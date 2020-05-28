import { ApolloServerTestClient } from "apollo-server-testing"
import { Repository } from "typeorm"
import { UsersResolver } from "."
import { setupTest } from "../../tests/setupTest"

describe('users resolver', () => {

    let client: ApolloServerTestClient,
        users: Repository<UsersResolver>

    before(async () => {

        const test = await setupTest()

        client = test.client
        users = test.repositories.users
    })
})
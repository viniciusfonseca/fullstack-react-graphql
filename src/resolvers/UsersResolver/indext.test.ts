import { ApolloServerTestClient } from "apollo-server-testing"
import { Repository } from "typeorm"
import { setupTest } from "../../tests/setupTest"
import { UserEntity } from "../../entities/UserEntity"

describe('users resolver', () => {

    let client: ApolloServerTestClient,
        users: Repository<UserEntity>

    before(async () => {

        const test = await setupTest()

        client = test.client
        users = test.repositories.users
    })
})
import { buildSchema } from "type-graphql";
import { CustomersResolver } from "../resolvers/CustomersResolver/index";
import { Container } from "inversify";

export async function createSchema(container: Container) {

    const schema = await buildSchema({
        container,
        resolvers: [
            CustomersResolver
        ]
    })

    return schema
}
import { createSchema } from "./createSchema"
import { ApolloServer } from "apollo-server"
import { apolloContextProvider } from "./apolloContextProvider"
import { Container } from "inversify"

export async function createApolloServer(
    container: Container,
    contextProvider = apolloContextProvider
) {

    const schema = await createSchema(container)

    return new ApolloServer({
        schema,
        tracing: true,
        cacheControl: true,
        playground: true,
        introspection: true,
        context(context) {
            return contextProvider(context, container)
        }
    })
}
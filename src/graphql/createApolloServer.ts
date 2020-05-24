import { createSchema } from "./createSchema"
import { ApolloServer } from "apollo-server"
import { apolloContextProvider } from "./apolloContextProvider"
import { Container } from "inversify"

export async function createApolloServer(
    container: Container,
    customApolloContextProvider = apolloContextProvider
) {

    const schema = await createSchema(container)

    const server = new ApolloServer({
        schema,
        tracing: true,
        cacheControl: true,
        context(context) {
            return customApolloContextProvider(context, container)
        }
    })

    return server
}
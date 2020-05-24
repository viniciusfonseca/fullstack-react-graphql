import 'reflect-metadata'
import { createSchema } from "./graphql/createSchema";
import { ApolloServer } from 'apollo-server'
import { createApolloServer } from './graphql/createApolloServer';
import { createContainer } from './services/createContainer';

async function main() {

    const container = await createContainer()

    const server = await createApolloServer(container)

    const { port } = await server.listen(process.env.PORT ?? 4000)

    console.log(`🚀 Apollo Server listening at port ${port}`)
}

main()
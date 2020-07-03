import 'reflect-metadata'
import { createSchema } from "./graphql/createSchema";
import { ApolloServer } from 'apollo-server'
import { createApolloServer } from './graphql/createApolloServer';
import { createContainer } from './services/createContainer';
import * as http from 'http'
import { EventEmitter } from 'events'

let httpServer: http.Server = null
let evt = new EventEmitter()

async function main() {

    const container = await createContainer()

    const server = await createApolloServer(container)

    const serverInfo = await server.listen(process.env.PORT ?? 4000)
    httpServer = serverInfo.server
    evt.emit('ready')

    console.log(`🚀 Apollo Server listening at port ${serverInfo.port}`)
}

main()

module.exports = http.createServer((req, res) => {

    function onServerReady() {
        httpServer.emit('request', req, res)
    }

    if (!httpServer) {
        evt.once('ready', onServerReady)
        return
    }

    onServerReady()
})
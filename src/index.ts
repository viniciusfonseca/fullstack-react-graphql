import 'reflect-metadata'
import { createSchema } from "./graphql/createSchema";
import { ApolloServer } from 'apollo-server'
import { createApolloServer } from './graphql/createApolloServer';
import { createContainer } from './services/createContainer';
import * as http from 'http'
import { EventEmitter } from 'events'
import { NowRequest, NowResponse } from '@vercel/node'

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

function ServerlessExport(req: NowRequest, res: NowResponse) {
    function onServerReady() {
        httpServer.emit('request', req, res)
    }
    if (!httpServer) {
        evt.once('ready', onServerReady)
    }
    else {
        onServerReady()
    }
}

module.exports = ServerlessExport
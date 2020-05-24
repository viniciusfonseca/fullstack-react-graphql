import { Container } from "inversify";
import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import { CustomerEntity } from "../entities/CustomerEntity";
import { AddressEntity } from "../entities/AddressEntity";
import { OrderToProductEntity } from "../entities/OrderToProductEntity";
import { OrderEntity } from "../entities/OrderEntity";
import { UserEntity } from "../entities/UserEntity";
import { ProductEntity } from "../entities/ProductEntity";

export async function createDBConnection() {

    const connectionCfg: Partial<ConnectionOptions> = {
        type: 'sqlite',
        database: ':memory:'
    }

    const connection = await createConnection({
        type: connectionCfg.type,
        database: connectionCfg.database,
        entities: [
            CustomerEntity,
            AddressEntity,
            OrderEntity,
            OrderToProductEntity,
            UserEntity,
            ProductEntity
        ]
    })

    if (connectionCfg.database === ':memory:') {
        await connection.synchronize()
    }

    return connection
}

export const DB_CONNECTION = Symbol("DB_CONNECTION")

export async function bindDBConnection(container: Container) {

    const connection = await createDBConnection()

    container.bind<Connection>(DB_CONNECTION).toConstantValue(connection)
}
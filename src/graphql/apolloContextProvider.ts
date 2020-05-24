import { Container } from "inversify";
import { Connection, Repository } from "typeorm";
import { DB_CONNECTION } from "../services/bindDBConnection";
import { UserEntity } from "../entities/UserEntity";
import { JWT, JWTHelper } from "../services/Auth";

export async function apolloContextProvider(context: { req, res }, container: Container) {

    const token = context.req?.headers['authorization']

    const user = await getUser(token, container)
    
    return { user }

}

async function getUser(token: string, container: Container): Promise<UserEntity> {

    if (!token) { return null }

    const jwt = container.get<JWTHelper>(JWT)
    const connection = container.get<Connection>(DB_CONNECTION)
    const users = connection.getRepository(UserEntity)

    try {
        const { id, expiry } = jwt.verify(token)
        if (+expiry > +new Date()) { return null }
        return users.findOne({ where: { id } })
    }
    catch { return null }

}
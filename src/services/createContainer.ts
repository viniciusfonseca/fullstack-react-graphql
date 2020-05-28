import { Container } from "inversify";
import { bindDBConnection } from "./bindDBConnection";
import { CustomersResolver } from "../resolvers/CustomersResolver";
import { bindBCrypt } from "./bindBCrypt";
import { bindJWT } from "./Auth";
import { UsersResolver } from "../resolvers/UsersResolver";
import { AuthService } from "./AuthService";

export async function createContainer() {
    const container = new Container()

    bindBCrypt(container)
    bindJWT(container)
    await bindDBConnection(container)

    container.bind<CustomersResolver>(CustomersResolver).to(CustomersResolver)
    container.bind<UsersResolver>(UsersResolver).to(UsersResolver)

    container.bind<AuthService>(AuthService).to(AuthService)

    return container
}
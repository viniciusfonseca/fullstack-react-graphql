import { Container } from "inversify";
import { bindDBConnection } from "./bindDBConnection";
import { CustomersResolver } from "../resolvers/CustomersResolver";
import { bindBCrypt } from "./bindBCrypt";
import { bindJWT } from "./Auth";

export async function createContainer() {
    const container = new Container()

    bindBCrypt(container)
    bindJWT(container)
    await bindDBConnection(container)

    container.bind<CustomersResolver>(CustomersResolver).to(CustomersResolver)

    return container
}
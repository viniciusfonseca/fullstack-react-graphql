import { AuthChecker } from "type-graphql";
import { Container } from "inversify";
import * as jwt from 'jsonwebtoken'

export const AuthMiddleware: AuthChecker = async ({ root, args, context, info }) => {

    

    return true
}

export class JWTHelper {

    private secret = process.env.JWT_SECRET ?? "JWT_8002"

    sign(payload: any) {
        return jwt.sign(payload, this.secret)
    }

    verify(token: string) {
        return jwt.verify(token, this.secret) as {
            id: number
            expiry: number
        }
    }
}

export const JWT = Symbol("JWT")

export function bindJWT(container: Container) {

    const jwtHelper = new JWTHelper()

    container.bind<JWTHelper>(JWT).toConstantValue(jwtHelper)
}
import { Resolver, Mutation, Arg } from "type-graphql";
import { UserRegisterInput, UserLoginInput } from "./InputTypes";
import { AuthenticationError } from "apollo-server";
import { Connection, Repository } from "typeorm";
import { inject, injectable } from "inversify";
import { DB_CONNECTION } from "../../services/bindDBConnection";
import { UserEntity } from "../../entities/UserEntity";
import { LoginOutput } from "./OutputTypes";
import { AuthService } from "../../services/AuthService";

@injectable()
@Resolver()
export class UsersResolver {

    private users: Repository<UserEntity>

    constructor(
        @inject(DB_CONNECTION)
        private connection: Connection,
        @inject(AuthService)
        private auth: AuthService
    ) {
        this.users = connection.getRepository(UserEntity)
        this.auth.bindRepository(this.users)
    }
    
    @Mutation(() => Boolean)
    async userRegister(
        @Arg('payload') payload: UserRegisterInput
    ) {
        return await this.auth.register(payload)
    }

    @Mutation(() => LoginOutput)
    async userLogin(
        @Arg('payload') payload: UserLoginInput
    ) {
        return await this.auth.login(payload)
    }
}
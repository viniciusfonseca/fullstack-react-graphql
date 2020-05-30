import { injectable, inject } from "inversify";
import { DB_CONNECTION } from "./bindDBConnection";
import { Connection, Repository } from "typeorm";
import { UserRegisterInput, UserLoginInput } from "../resolvers/UsersResolver/InputTypes";
import { LoginOutput } from "../resolvers/UsersResolver/OutputTypes";
import { JWT, JWTHelper } from "./Auth";
import { BCRYPT, BCryptHelper } from "./bindBCrypt";
import { AuthenticationError } from "apollo-server";
import { UserEntity } from "../entities/UserEntity";

@injectable()
export class AuthService<T = UserEntity> {

    private repository: Repository<T>

    constructor(
        @inject(BCRYPT)
        private bcrypt: BCryptHelper,
        @inject(JWT)
        private jwt: JWTHelper,
        @inject(DB_CONNECTION)
        private connection: Connection
    ) {}

    bindRepository(repository: Repository<T>) {
        this.repository = repository
    }
    
    async register(payload: UserRegisterInput) : Promise<boolean> {
        if (payload.password !== payload.confirm_password) {
            throw new Error('confirmation must match')
        }

        if (payload.password.length < 6) {
            throw new Error('password must be at least 6 characters long')
        }

        const count = await this.repository.count({
            where: { email: payload.email }
        })
        if (count > 0) {
            throw new Error('email already used')
        }

        const password = await this.bcrypt.hash(payload.password)

        const user = Object.assign(this.repository.create(), payload, { password })
        await this.connection.manager.save(user)

        return true
    }

    async login(payload: UserLoginInput) : Promise<LoginOutput> {
        const user = (await this.repository.findOne({
            where: {
                email: payload.email
            }
        }) as unknown) as UserEntity

        if (!user) {
            throw new AuthenticationError('email or password incorrect')
        }

        const res = await this.bcrypt.verify(payload.password, user.password)
        if (!res) {
            throw new AuthenticationError('email or password incorrect')
        }

        const ONE_DAY_DURATION = 24 * 60 * 60 * 1000

        const token = this.jwt.sign({
            id: user.id,
            expiry: +new Date() + ONE_DAY_DURATION
        })

        return { user, token }
    }
}
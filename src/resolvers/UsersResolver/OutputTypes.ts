import { UserEntity } from "../../entities/UserEntity";
import { Field } from "type-graphql";

export class UserOutput {

    @Field()
    id: string

    @Field()
    email: string

}

export class LoginOutput {

    @Field()
    token: string

    @Field(() => UserOutput)
    user: UserOutput
}
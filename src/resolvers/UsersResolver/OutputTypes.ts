import { UserEntity } from "../../entities/UserEntity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserOutput {

    @Field()
    id: string

    @Field()
    email: string

}

@ObjectType()
export class LoginOutput {

    @Field()
    token: string

    @Field(() => UserOutput)
    user: UserOutput
}
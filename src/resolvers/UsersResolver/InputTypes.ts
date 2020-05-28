import { InputType, Field } from "type-graphql";

@InputType()
export class UserRegisterInput {

    @Field()
    email: string

    @Field()
    password: string
    
    @Field()
    confirm_password: string
}

@InputType()
export class UserLoginInput {

    @Field()
    email: string

    @Field()
    password: string
}
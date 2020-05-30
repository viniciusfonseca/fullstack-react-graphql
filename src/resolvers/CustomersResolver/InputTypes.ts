import { InputType, Field } from "type-graphql";
import { UserRegisterInput } from "../UsersResolver/InputTypes";

@InputType()
class AddressInput {

    @Field()
    city: string

    @Field()
    street: string

    @Field()
    number: string
}

@InputType()
export class CustomerCreateInput {

    @Field()
    email: string

    @Field()
    name: string

    @Field(() => AddressInput)
    address: AddressInput

}

@InputType()
export class CustomerUpdateInput extends CustomerCreateInput {}

@InputType()
export class CustomerRegisterInput extends UserRegisterInput {

    @Field()
    name: string

    @Field(() => AddressInput)
    address: AddressInput
}
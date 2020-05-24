import { ObjectType, ID, Field } from "type-graphql";

@ObjectType()
export class AddressType {

    @Field(() => ID)
    id: string

    @Field()
    street: string

    @Field()
    number: string

    @Field()
    city: string
}
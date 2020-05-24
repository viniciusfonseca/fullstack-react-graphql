import { ObjectType, ID, Field } from 'type-graphql'
import { AddressType } from './AddressType'

@ObjectType()
export class CustomerType {
    
    @Field(() => ID)
    id: string

    @Field()
    name: string

    @Field()
    email: string

    @Field(() => AddressType)
    address: AddressType
}
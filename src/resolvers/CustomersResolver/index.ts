import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CustomerType } from "../../graphql/CustomerType";
import { CustomerCreateInput, CustomerUpdateInput } from "./InputTypes";
import { injectable, inject } from "inversify";
import { DB_CONNECTION } from "../../services/bindDBConnection";
import { Connection, Repository } from "typeorm";
import { CustomerEntity } from "../../entities/CustomerEntity";
import { AddressEntity } from "../../entities/AddressEntity";

@injectable()
@Resolver(CustomerType)
export class CustomersResolver {

    private customers: Repository<CustomerEntity>
    private addresses: Repository<AddressEntity>

    constructor(
        @inject(DB_CONNECTION)
        private connection: Connection
    ) {
        this.customers = this.connection.getRepository(CustomerEntity)
        this.addresses = this.connection.getRepository(AddressEntity)
    }

    @Query(() => [CustomerType])
    async getCustomers() {
        return this.customers.find({ relations: ['address'] })
    }

    @Mutation(() => CustomerType)
    async createCustomer(
        @Arg('payload') payload: CustomerCreateInput
    ) {
        const customer = this.customers.create(payload)
        return this.connection.manager.save(customer)
    }

    @Query(() => CustomerType)
    async getCustomer(@Arg('id') id: string) {
        return this.customers.findOne({ relations: ['address'], where: { id } })
    }

    @Mutation(() => CustomerType)
    async updateCustomer(
        @Arg('id') id: string,
        @Arg('payload') payload: CustomerUpdateInput
    ) {
        const customer = await this.customers.findOne({
            where: { id },
            relations: ['address']
        })

        const {
            address: addressPayload,
            ...customerPayload
        } = payload

        Object.assign(customer, customerPayload)
        Object.assign(customer.address, addressPayload)

        await this.connection.manager.save(customer)

        return customer
    }

    @Mutation(() => Boolean)
    async deleteCustomer(@Arg('id') id: string) {

        const customer = await this.customers.findOne({
            where: { id },
            relations: ['address']
        })
        await this.customers.remove(customer)
        await this.addresses.remove(customer.address)

        return true
    }
}
import 'reflect-metadata'
import { ApolloServerTestClient } from 'apollo-server-testing'
import { gql } from 'apollo-server'
import { assert } from 'chai'
import { Repository } from 'typeorm'
import { CustomerEntity } from '../../entities/CustomerEntity'
import { AddressEntity } from '../../entities/AddressEntity'
import { setupTest } from '../../tests/setupTest'

describe('customers resolver', () => {

    let client: ApolloServerTestClient,
        customers: Repository<CustomerEntity>,
        addresses: Repository<AddressEntity>

    before(async () => {
        const setup = await setupTest()

        client = setup.client
        customers = setup.repositories.customers
        addresses = setup.repositories.addresses
    })

    beforeEach(async () => {
        await customers.clear()
        await addresses.clear()
    })

    it('creates a customer', async () => {

        const mutation = gql`mutation {
            createCustomer(payload: {
                name: "Vinicius Fonseca"
                email: "vfonseca1618@example.com"
                address: {
                    city: "São Paulo"
                    street: "R Foo Bar"
                    number: "1337"
                }
            }) { id }
        }`

        const { data } = await client.mutate({ mutation })

        const customer = await customers.findOne({
            where: data.createCustomer,
            relations: ['address']
        })

        assert.exists(customer)
        assert.strictEqual(customer.name, "Vinicius Fonseca")
        assert.strictEqual(customer.email, "vfonseca1618@example.com")
        assert.strictEqual(customer.address.city, "São Paulo")
        assert.strictEqual(customer.address.street, "R Foo Bar")
        assert.strictEqual(customer.address.number, "1337")

    })

    it('lists customers', async () => {

        const pending: Promise<any>[] = []
        for (let i = 0; i < 20; i++) {
            const code = Math.random().toString(16).replace('.', "")
            const p = customers.save(Object.assign(new CustomerEntity(), {
                name: `V-${code}`,
                email: `v-${code}@example.com`,
                address: Object.assign(new AddressEntity(), {
                    city: `C-${code}`,
                    street: `S-${code}`,
                    number: code
                })
            }))
            pending.push(p)
        }

        await Promise.all(pending)

        const query = gql`query {
            getCustomers {
                name
                email
                address {
                    city
                    street
                    number
                }
            }
        }`

        const { data } = await client.query({ query })

        assert.ok(Array.isArray(data.getCustomers))
        assert.strictEqual(data.getCustomers.length, 20)

    })

    it('gets one customer', async () => {

        const { id } = await customers.save(Object.assign(new CustomerEntity(), {
            name: 'Vinicius Fonseca',
            email: 'v12345@example.com',
            address: Object.assign(new AddressEntity(), {
                city: `C-123`,
                street: `S-123`,
                number: '123'
            })
        }))

        const query = gql`query {
            getCustomer(id: "${id}") {
                name
                email
                address {
                    city
                    street
                    number
                }
            }
        }`

        const { data } = await client.query({ query })
        const customer = data.getCustomer

        assert.exists(customer)
        assert.strictEqual(customer.name, 'Vinicius Fonseca')
        assert.strictEqual(customer.email, 'v12345@example.com')
        assert.strictEqual(customer.address.city, `C-123`)
        assert.strictEqual(customer.address.street, `S-123`)
        assert.strictEqual(customer.address.number, '123')

    })

    it('updates one customer', async () => {

        const { id } = await customers.save(Object.assign(new CustomerEntity(), {
            name: 'Vinicius Fonseca',
            email: 'v12345@example.com',
            address: Object.assign(new AddressEntity(), {
                city: `C-123`,
                street: `S-123`,
                number: '123'
            })
        }))

        const mutation = gql`mutation {
            updateCustomer(id: "${id}", payload: {
                name: "Updated Name"
                email: "updated@example.com"
                address: {
                    city: "updated city"
                    street: "updated street"
                    number: "456"
                }
            }) { id }
        }`

        await client.mutate({ mutation })

        const customer = await customers.findOne({
            where: { id },
            relations: ['address']
        })

        assert.strictEqual(customer.name,  "Updated Name")
        assert.strictEqual(customer.email, "updated@example.com")
        assert.strictEqual(customer.address.city, "updated city")
        assert.strictEqual(customer.address.street, "updated street")
        assert.strictEqual(customer.address.number, "456")

    })

    it('deletes one customer with its address', async () => {

        const {
            id,
            address: { id: addressId }
        } = await customers.save(Object.assign(new CustomerEntity(), {
            name: 'Vinicius Fonseca',
            email: 'v12345@example.com',
            address: Object.assign(new AddressEntity(), {
                city: `C-123`,
                street: `S-123`,
                number: '123'
            })
        }))

        const mutation = gql`mutation {
            deleteCustomer(id: "${id}")
        }`

        const { data } = await client.mutate({ mutation })

        assert.isTrue(data.deleteCustomer)

        const customer = await customers.findOne({ where: { id } })
        assert.notExists(customer)

        const address = await addresses.findOne({ where: { id: addressId } })
        assert.notExists(address)
    })

})
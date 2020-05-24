import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { CustomerEntity } from "./CustomerEntity";

@Entity()
export class AddressEntity {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    city: string

    @Column()
    street: string

    @Column()
    number: string

    @OneToOne(
        () => CustomerEntity,
        customer => customer.address
    )
    customer: CustomerEntity

}
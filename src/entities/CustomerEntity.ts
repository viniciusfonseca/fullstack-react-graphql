import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { AddressEntity } from "./AddressEntity";

@Entity()
export class CustomerEntity {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column({ nullable: true })
    password?: string

    @OneToOne(() => AddressEntity, { cascade: true })
    @JoinColumn()
    address: AddressEntity
}
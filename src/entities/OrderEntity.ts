import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, OneToOne, Column } from "typeorm";
import { OrderToProductEntity } from "./OrderToProductEntity";

export enum OrderStatus {
    OPEN = "OPEN",
    AWAIT_PAYMENT = "AWAIT_PAYMENT",
    DELIVERING = "DELIVERING",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED"
}

@Entity()
export class OrderEntity {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    status: OrderStatus

    @OneToMany(() => OrderToProductEntity, orderToProduct => orderToProduct.order)
    orderToProducts: OrderToProductEntity[]
}
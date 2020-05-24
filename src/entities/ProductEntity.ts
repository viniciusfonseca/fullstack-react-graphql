import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";
import { OrderToProductEntity } from "./OrderToProductEntity";

@Entity()
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    currency: string

    @Column()
    price: number

    @OneToMany(() => OrderToProductEntity, orderToProduct => orderToProduct.product)
    orderToProducts: OrderToProductEntity[]
}
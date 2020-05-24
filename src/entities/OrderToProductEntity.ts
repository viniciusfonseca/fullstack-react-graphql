import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ProductEntity } from "./ProductEntity";
import { OrderEntity } from "./OrderEntity";

@Entity()
export class OrderToProductEntity {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    orderId: string

    @Column()
    productId: string

    @Column()
    quantity: string

    @ManyToOne(() => ProductEntity, product => product.orderToProducts)
    product: ProductEntity

    @ManyToOne(() => OrderEntity, order => order.orderToProducts)
    order: OrderEntity
}
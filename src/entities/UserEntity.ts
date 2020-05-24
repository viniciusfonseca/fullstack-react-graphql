import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    email: string

    @Column({ nullable: true })
    password?: string
}
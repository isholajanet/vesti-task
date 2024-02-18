import { Customer } from "src/customers/entities/customer.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../order-status.enum";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @Column( {type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING} )
    order_status: OrderStatus

    @ManyToMany(() => Product, (product) => product.orders, { cascade: true})
    @JoinTable()
    products: Product[]

    @Column()
    order_total: number;

    @Column()
    notes: string;

    @Column()
    createdAt: Date;
}

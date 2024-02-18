import { Order } from "src/orders/entities/order.entity";
import { Column, ManyToOne, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    productId: number;

    @Column()
    name: string;

    @Column( {type: 'text', nullable: true})
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToMany(() => Order, (order) => order.products)
    @JoinTable(
        {
            name: 'order_product', // Specify the name of the join table
            joinColumn: {
                name: 'product_id',
                referencedColumnName: 'productId'
            },
            inverseJoinColumn: {
                name: 'order_id',
                referencedColumnName: 'id'
            }
        }
    )
    orders: Order[];


    @Column()
    createdAt: Date
}

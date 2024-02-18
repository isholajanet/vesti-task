import { Order } from "src/orders/entities/order.entity";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { State } from "../state.enum";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    customerId: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    phonenumber: string;

    @Column( {unique: true} )
    username: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @Column( {type: 'enum', enum: State, default: State.DEFAULT})
    state: State;

    @ManyToMany(() => Transaction, (transaction) => transaction.customers)
    @JoinTable()
    transactions: Transaction[]

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
    



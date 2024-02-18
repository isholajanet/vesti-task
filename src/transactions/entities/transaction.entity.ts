import { Customer } from "src/customers/entities/customer.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;

    @Column()
    amount: number;
    

    @ManyToMany(() => Customer, (customer) => customer.transactions)
    @JoinTable()
    customers: Customer[];

    @Column()
    createdAt: Date;
}

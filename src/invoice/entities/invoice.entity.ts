import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { InvoiceItem } from 'src/invoice-item/entities/invoice-item.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  date: Date;

  @Column('float')
  total: number;

  @Column('text') // contado | credito
  paymentType: string;

  @Column('boolean', { default: false })
  isPaid: boolean;

  @ManyToOne(() => Customer, (customer) => customer.invoices, { eager: true })
  customer: Customer;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true, eager: true })
  items: InvoiceItem[];
}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sale } from 'src/sales/entities/sale.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: number;

  @OneToMany(() => Sale, (sale) => sale.customer)
  sales: Sale[];

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
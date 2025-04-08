import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (customer) => customer.sales, { eager: true })
  customer: Customer;

  @Column()
  colaborator: string;

  @Column()
  paymentType: 'contado' | 'credito';

  @Column('int')
  total: number;

  @Column({ default: false })
  isPaid: boolean;

  @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true, eager: true })
  items: SaleItem[];
}
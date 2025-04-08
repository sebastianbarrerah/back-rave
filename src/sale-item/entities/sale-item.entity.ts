import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Sale } from 'src/sales/entities/sale.entity';

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @ManyToOne(() => Sale, (sale) => sale.items)
  sale: Sale;

  @Column('int')
  quantity: number;

  @Column('float')
  unitPrice: number;

  @Column('float')
  subtotal: number;
}
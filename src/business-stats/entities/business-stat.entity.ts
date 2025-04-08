import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BusinessStat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { default: 0 })
  totalSales: number;

  @Column('int', { default: 0 })
  totalInvoices: number;

  @Column('int', { default: 0 })
  totalProductsSold: number;
}
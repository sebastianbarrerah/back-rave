import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('int', { default: 0 })
  lot: number;

  @Column('text', { nullable: true })
  imageProduct: string;

  @Column('text', { default: 'ferreteria' })
  category: string;

  @Column('boolean', { default: true })
  isActive: boolean;
}



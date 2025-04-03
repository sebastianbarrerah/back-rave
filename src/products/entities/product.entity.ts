import { Inventory } from "src/inventory/entities/inventory.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        nullable: false
    })
    fullName: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'float',
        default: 0
    })
    price: number;

    @Column({
        type: 'int',
        default: 0,
        nullable: false
    })
    lot: number;

    @Column({
        type: 'text',
        default: '',
        nullable: true
    })
    imageProduct: string;

    @Column({
        type: 'text',
        default: 'ferreteria'
    })
    category: string;


    @Column({
        type: 'boolean',
        default: true
    })
    isActive: boolean;

    @OneToOne(() => Inventory)
    @JoinColumn()
    inventory: Inventory;

    // tambien con ventas para generar la factura


}

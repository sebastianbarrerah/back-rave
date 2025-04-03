import { Product } from "src/products/entities/product.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true,
    })
    products: Product;

    @Column({
        type: 'int',
    })
    stock: number;
}

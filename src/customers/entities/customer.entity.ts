import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({
        type: 'text',
        nullable: false
    })
    fullName?: string;
    
    @Column({
        type: 'text',
        unique: true,
        nullable: false
    })
    email?: string;

    @Column({
        type: 'int',
        default: 0
    })
    phone?: number;

    @Column({
        type: 'bool',
        default: true
    })
    isActive?: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    // sales aqui se pone la relación con las ventas
}
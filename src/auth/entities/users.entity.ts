import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
    })
    fullName: string;
    
    @Column({
        type: 'text',
        unique: true
    })
    email: string;
    
    @Column({
        type: 'text',
    })
    password: string;
    
    @Column({
        type: 'text',
        array: true,
        default: ['user']
    })
    roles: string[];
    
    
    @Column('text', {
        nullable: true
    })
    photo: string;
    
    @Column('bool',{
        default: true
    })
    isActive: boolean;
}
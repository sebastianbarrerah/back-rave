import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("colaboradores")
export class Colaborador {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ unique: true })
  documento: string

  @Column({ unique: true })
  email: string

  @Column()
  telefono: string

  @Column()
  cargo: string

  @Column({ nullable: true })
  direccion: string

  @Column({ nullable: true })
  observaciones: string

  @Column({ default: true })
  activo: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

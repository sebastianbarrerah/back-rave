import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Producto } from "./producto.entity"

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  nombre: string

  @Column({ nullable: true })
  descripcion: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => Producto,
    (producto) => producto.categoria,
  )
  productos: Producto[]
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm"
import { Categoria } from "./categoria.entity"
import { DetalleVenta } from "../../ventas/entities/detalle-venta.entity"

@Entity("productos")
export class Producto {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  codigo: string

  @Column()
  nombre: string

  @Column()
  categoriaId: number

  @ManyToOne(
    () => Categoria,
    (categoria) => categoria.productos,
  )
  @JoinColumn({ name: "categoriaId" })
  categoria: Categoria

  @Column()
  stock: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  costo: number

  @Column({ default: "Disponible" })
  estado: string

  @Column({ nullable: true })
  imagen: string

  @Column({ nullable: true, type: "text" })
  descripcion: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => DetalleVenta,
    (detalleVenta) => detalleVenta.producto,
  )
  detallesVenta: DetalleVenta[]
}

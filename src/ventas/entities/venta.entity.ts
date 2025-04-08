import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm"
import { Cliente } from "../../clientes/entities/cliente.entity"
import { User } from "../../users/entities/user.entity"
import { DetalleVenta } from "./detalle-venta.entity"

@Entity("ventas")
export class Venta {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  clienteId: number

  @ManyToOne(
    () => Cliente,
    (cliente) => cliente.ventas,
  )
  @JoinColumn({ name: "clienteId" })
  cliente: Cliente

  @Column()
  vendedorId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: "vendedorId" })
  vendedor: User

  @Column({ type: "timestamp" })
  fecha: Date

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  impuestos: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number

  @Column({ default: "Completada" })
  estado: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => DetalleVenta,
    (detalleVenta) => detalleVenta.venta,
    { cascade: true },
  )
  detalles: DetalleVenta[]
}

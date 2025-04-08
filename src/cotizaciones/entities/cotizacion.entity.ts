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
import { DetalleCotizacion } from "./detalle-cotizacion.entity"

@Entity("cotizaciones")
export class Cotizacion {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  numero: string

  @Column()
  clienteId: number

  @ManyToOne(
    () => Cliente,
    (cliente) => cliente.cotizaciones,
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

  @Column({ type: "timestamp" })
  fechaVencimiento: Date

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  impuestos: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number

  @Column({ default: "Pendiente" })
  estado: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => DetalleCotizacion,
    (detalleCotizacion) => detalleCotizacion.cotizacion,
    { cascade: true },
  )
  detalles: DetalleCotizacion[]
}

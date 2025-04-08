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
import { Venta } from "../../ventas/entities/venta.entity"
import { DetalleFactura } from "./detalle-factura.entity"

@Entity("facturas")
export class Factura {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  numero: string

  @Column()
  clienteId: number

  @ManyToOne(
    () => Cliente,
    (cliente) => cliente.facturas,
  )
  @JoinColumn({ name: "clienteId" })
  cliente: Cliente

  @Column({ nullable: true })
  ventaId: number

  @ManyToOne(() => Venta, { nullable: true })
  @JoinColumn({ name: "ventaId" })
  venta: Venta

  @Column({ type: "timestamp" })
  fecha: Date

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  impuestos: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number

  @Column({ default: "Emitida" })
  estado: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => DetalleFactura,
    (detalleFactura) => detalleFactura.factura,
    { cascade: true },
  )
  detalles: DetalleFactura[]
}

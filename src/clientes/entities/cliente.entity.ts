import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Venta } from "../../ventas/entities/venta.entity"
import { Factura } from "../../facturacion/entities/factura.entity"
import { Cotizacion } from "../../cotizaciones/entities/cotizacion.entity"

@Entity("clientes")
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ unique: true })
  documento: string

  @Column()
  tipo: string

  @Column()
  email: string

  @Column()
  telefono: string

  @Column()
  direccion: string

  @Column({ nullable: true })
  observaciones: string

  @Column({ default: true })
  activo: boolean


  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => Venta,
    (venta) => venta.cliente,
  )
  ventas: Venta[]

  @OneToMany(
    () => Factura,
    (factura) => factura.cliente,
  )
  facturas: Factura[]

  @OneToMany(
    () => Cotizacion,
    (cotizacion) => cotizacion.cliente,
  )
  cotizaciones: Cotizacion[]
}

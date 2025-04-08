import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Cotizacion } from "./cotizacion.entity"
import { Producto } from "../../productos/entities/producto.entity"

@Entity("detalles_cotizacion")
export class DetalleCotizacion {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  cotizacionId: number

  @ManyToOne(
    () => Cotizacion,
    (cotizacion) => cotizacion.detalles,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "cotizacionId" })
  cotizacion: Cotizacion

  @Column()
  productoId: number

  @ManyToOne(() => Producto)
  @JoinColumn({ name: "productoId" })
  producto: Producto

  @Column()
  cantidad: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precioUnitario: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  importe: number
}

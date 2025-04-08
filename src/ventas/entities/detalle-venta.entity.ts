import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Venta } from "./venta.entity"
import { Producto } from "../../productos/entities/producto.entity"

@Entity("detalles_venta")
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  ventaId: number

  @ManyToOne(
    () => Venta,
    (venta) => venta.detalles,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "ventaId" })
  venta: Venta

  @Column()
  productoId: number

  @ManyToOne(
    () => Producto,
    (producto) => producto.detallesVenta,
  )
  @JoinColumn({ name: "productoId" })
  producto: Producto

  @Column()
  cantidad: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precioUnitario: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  importe: number
}

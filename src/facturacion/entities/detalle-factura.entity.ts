import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Factura } from "./factura.entity"
import { Producto } from "../../productos/entities/producto.entity"

@Entity("detalles_factura")
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  facturaId: number

  @ManyToOne(
    () => Factura,
    (factura) => factura.detalles,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "facturaId" })
  factura: Factura

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

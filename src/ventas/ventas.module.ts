import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { VentasService } from "./ventas.service"
import { VentasController } from "./ventas.controller"
import { Venta } from "./entities/venta.entity"
import { DetalleVenta } from "./entities/detalle-venta.entity"
import { ProductosModule } from "../productos/productos.module"
import { ClientesModule } from "../clientes/clientes.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta, DetalleVenta]),
    forwardRef(() => ProductosModule), // 👈 así rompemos el ciclo
    forwardRef(() => ClientesModule),
  ],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService],
})
export class VentasModule {}


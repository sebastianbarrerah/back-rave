import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProductosService } from "./productos.service"
import { ProductosController } from "./productos.controller"
import { Producto } from "./entities/producto.entity"
import { Categoria } from "./entities/categoria.entity"
import { VentasModule } from "src/ventas/ventas.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Categoria]),
    forwardRef(() => VentasModule), // 👈 agregalo si hay uso del módulo de ventas
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService],
})
export class ProductosModule {}

import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { FacturacionService } from "./facturacion.service"
import { FacturacionController } from "./facturacion.controller"
import { Factura } from "./entities/factura.entity"
import { DetalleFactura } from "./entities/detalle-factura.entity"
import { VentasModule } from "../ventas/ventas.module"
import { ClientesModule } from "../clientes/clientes.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([Factura, DetalleFactura]),
    forwardRef(() => VentasModule),
    forwardRef(() => ClientesModule),
  ],
  controllers: [FacturacionController],
  providers: [FacturacionService],
  exports: [FacturacionService],
})
export class FacturacionModule {}

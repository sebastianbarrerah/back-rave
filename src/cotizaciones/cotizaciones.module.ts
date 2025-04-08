import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CotizacionesService } from "./cotizaciones.service"
import { CotizacionesController } from "./cotizaciones.controller"
import { Cotizacion } from "./entities/cotizacion.entity"
import { DetalleCotizacion } from "./entities/detalle-cotizacion.entity"
import { ProductosModule } from "../productos/productos.module"
import { ClientesModule } from "../clientes/clientes.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([Cotizacion, DetalleCotizacion]),
    ProductosModule,
    ClientesModule,
  ],
  
  controllers: [CotizacionesController],
  providers: [CotizacionesService],
  exports: [CotizacionesService],
})
export class CotizacionesModule {}

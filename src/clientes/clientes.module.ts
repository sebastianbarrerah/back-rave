import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ClientesService } from "./clientes.service"
import { ClientesController } from "./clientes.controller"
import { Cliente } from "./entities/cliente.entity"
import { VentasModule } from "src/ventas/ventas.module"

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService], // 👈 esto es lo más importante
})
export class ClientesModule {}


import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { APP_GUARD } from "@nestjs/core"

import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard"
import { RolesGuard } from "./auth/guards/roles.guard"

import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { ClientesModule } from "./clientes/clientes.module"
import { ProductosModule } from "./productos/productos.module"
import { VentasModule } from "./ventas/ventas.module"
import { FacturacionModule } from "./facturacion/facturacion.module"
import { CotizacionesModule } from "./cotizaciones/cotizaciones.module"
import { ColaboradoresModule } from "./colaboradores/colaboradores.module"
import { RolesModule } from "./roles/roles.module"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "dpg-cvhgfc8fnakc739ls5cg-a.oregon-postgres.render.com",
      port: 5432,
      username: "sebastianbh",
      password: "sfu9J43qyVODFEWGfAnjtv3r9pYcf380",
      database: "acabadosyestilos",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
      ssl: true,
    }),

    AuthModule,
    UsersModule,
    ClientesModule,
    ProductosModule,
    VentasModule,
    FacturacionModule,
    CotizacionesModule,
    ColaboradoresModule,
    RolesModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}

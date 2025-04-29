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
      type: 'postgres',
      host: 'dpg-d08m03ffte5s73c63adg-a.oregon-postgres.render.com',
      port: 5432,
      username: 'root',
      password: 'TdyIIRze7EUIhy3rSJ6ei7YMtKsZXEFH',
      database: 'backacabadosyestilos',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,           
      ssl: true,               
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
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

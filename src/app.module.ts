import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
    EmailModule,
    AuthModule,
    CustomersModule,
    ProductsModule,
    InventoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { EmailModule } from './email/email.module';
import { SalesModule } from './sales/sales.module';
import { BusinessStatsModule } from './business-stats/business-stats.module';
import { MetricsModule } from './metrics/metrics.module';
import { InvoiceModule } from './invoice/invoice.module';
import { SaleItemModule } from './sale-item/sale-item.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';

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
    SalesModule,
    BusinessStatsModule,
    MetricsModule,
    InvoiceModule,
    SaleItemModule,
    InvoiceItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';
import { BusinessStat } from 'src/business-stats/entities/business-stat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, Customer, Product, SaleItem, BusinessStat ])
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}

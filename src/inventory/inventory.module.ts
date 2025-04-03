import { forwardRef, Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory, Product]),
    forwardRef(() => ProductsModule )
  ],
  exports: [TypeOrmModule],
  controllers: [InventoryController],
  providers: [InventoryService, ProductsService],
})
export class InventoryModule {}

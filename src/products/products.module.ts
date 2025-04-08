import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { InventoryModule } from 'src/inventory/inventory.module';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { InventoryService } from 'src/inventory/inventory.service';
import { Sale } from 'src/sales/entities/sale.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Inventory, Sale]),
    forwardRef( () => InventoryModule )
    
  ],
  exports: [TypeOrmModule],
  controllers: [ProductsController],
  providers: [ProductsService, InventoryService]
})
export class ProductsModule {}

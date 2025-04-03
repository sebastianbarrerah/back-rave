import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class InventoryService {

  constructor(
    @InjectRepository(Inventory)
    private readonly repository: Repository<Inventory>,
    @Inject(forwardRef(() => ProductsService))
    private serviceProduct: ProductsService
  ) { }

  async updateStockMin(updateInventoryDto: UpdateInventoryDto) {
    const { productId, stock } = updateInventoryDto;
      const inventory = await this.repository.findOne({
        where: {products: productId as any} 
      });
  
      if (!inventory) {
        throw new NotFoundException('El producto no existe en el inventario.' + productId);
      }
  
      if (stock < 0 || inventory.stock - stock < 0 ) {
        throw new BadRequestException(`Stock insuficiente. Solo hay ${inventory.stock} unidades disponibles. No puedes vender esa cantidad`);
      }
  
      inventory.stock -= stock;
      return this.repository.save(inventory);
  }

  async createInventory(id: string, cantidad?: number){
    
    const inventory = this.repository.create({
      products: id as DeepPartial<Inventory>,
      stock: cantidad? cantidad: 1
    });

    return this.repository.save(inventory);
  }

  async updateStockMax(id: string, updateInventoryDto: UpdateInventoryDto){
    const {stock, productId} = updateInventoryDto;

    const inventory = await this.repository.findOne({
      where: {products: id as any} 
    });

    if(!inventory){
      throw new NotFoundException(`El producto con el id ${id} no existe.`)
    }

    if(stock){
      if(stock < 1){
        throw new BadRequestException(`La cantidad debe de ser mayor a 1`)
      }

      const inventoryUpdate = await this.repository.findOne({
        where: {products: id as any} 
      });

      inventoryUpdate.stock += stock;

      await this.serviceProduct.updateProductoMax(id, stock)
      return await this.repository.save(inventoryUpdate);

    }
  }
}

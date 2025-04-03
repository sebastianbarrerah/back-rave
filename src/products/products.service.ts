import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InventoryService } from 'src/inventory/inventory.service';
import { error } from 'console';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    @Inject(forwardRef(() => InventoryService))
    private serviceInventory: InventoryService
  ){}

  async create(createProductDto: CreateProductDto) {

    try {
      const producto = this.repository.create(createProductDto)
       const productSave = await this.repository.save(producto)

      this.serviceInventory.createInventory(productSave.id, productSave.lot)
      return producto;
    } catch (error) { 
      console.log(error);
      throw new error(`El producto no se pudo guardar por ${error.message}`)
    }
  }

  async findAll() {
    try{
      const productos = await this.repository.find();
      return productos;
    }catch(error){
      console.log(error);
      throw new NotFoundException(`No se puede traer todos los productos ${error}`)
      
    }
  }

  async findOne(id: string) {
    // const producto = await this.repository.findOneBy({id})
    // if(producto){
    //   throw new NotFoundException(`El producto con el id: ${id} no existe`)
    // }
    try {
      return this.repository.findOneBy({id})
      
    } catch (error) {
      console.log(error);
      throw new error(`El producto no se pudo guardar por ${error}`)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const {lot} = updateProductDto;
    const inventoryQuery = {productId: id, stock: lot}
    const productExisting = this.repository.findOne({
      where: {id: id}
    })
    if(!productExisting){
      throw new NotFoundException(`El producto con el id: ${id} no existe`)
    }
    try {
      const product = await this.findOne(id)
      if(lot) {
        await this.repository.update(id, updateProductDto);
        this.serviceInventory.updateStockMin(inventoryQuery)
        return product
      }
      await this.repository.update(id, updateProductDto);
      return product;

    } catch (error) {
    }
  }

  async updateProductoMax(productId: string, stock:number){
    const productSearch = await this.findOne(productId);
    if(!productSearch){
      throw new error(`El producto no existe.`);
    }
    const productUpdate = await this.repository.update(productId, {lot: stock});
    return productUpdate;
  }

  async remove(id: string, updateProductDto:UpdateProductDto) {
    try {
      return await this.repository.update(id, updateProductDto)
    } catch (error) {
      console.log(error);
      throw new error(error)
    }
  }
}

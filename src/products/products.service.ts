import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ){}

  create(createProductDto: CreateProductDto) {
    try {
      const producto = this.repository.create(createProductDto)
       this.repository.save(producto)
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

  update(id: string, updateProductDto: UpdateProductDto) {
    // const product = this.repository.findOneBy({id})
    // if(product){
    //   throw new NotFoundException(`El producto con el id: ${id} no existe`)
    // }
    try {
      const productUpdate = this.repository.update(id, updateProductDto);
      return productUpdate
    } catch (error) {
      
    }
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

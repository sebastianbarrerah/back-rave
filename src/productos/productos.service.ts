import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Producto } from "./entities/producto.entity"
import { Categoria } from "./entities/categoria.entity"
import { CreateProductoDto } from "./dto/create-producto.dto"
import { UpdateProductoDto } from "./dto/update-producto.dto"
import { CreateCategoriaDto } from "./dto/create-categoria.dto"
import { UpdateCategoriaDto } from "./dto/update-categoria.dto"

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  // Métodos para productos
  async createProducto(createProductoDto: CreateProductoDto): Promise<Producto> {
    // Verificar si existe la categoría
    if (createProductoDto.categoriaId) {
      const categoria = await this.categoriasRepository.findOne({
        where: { id: createProductoDto.categoriaId },
      })

      if (!categoria) {
        throw new BadRequestException(`Categoría con ID ${createProductoDto.categoriaId} no encontrada`)
      }
    }

    const producto = this.productosRepository.create(createProductoDto)
    return this.productosRepository.save(producto)
  }

  async findAllProductos(): Promise<Producto[]> {
    return this.productosRepository.find({
      relations: ["categoria"],
    })
  }

  async findProductoById(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({
      where: { id },
      relations: ["categoria"],
    })

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`)
    }

    return producto
  }

  async findProductosByCodigo(codigo: string): Promise<Producto> {
    const producto = await this.productosRepository.findOne({
      where: { codigo },
      relations: ["categoria"],
    })

    if (!producto) {
      throw new NotFoundException(`Producto con código ${codigo} no encontrado`)
    }

    return producto
  }

  async findProductosByCategoria(categoriaId: number): Promise<Producto[]> {
    return this.productosRepository.find({
      where: { categoriaId },
      relations: ["categoria"],
    })
  }

  async findProductosByEstado(estado: string): Promise<Producto[]> {
    return this.productosRepository.find({
      where: { estado },
      relations: ["categoria"],
    })
  }

  async updateProducto(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findProductoById(id)

    // Verificar si existe la categoría
    if (updateProductoDto.categoriaId) {
      const categoria = await this.categoriasRepository.findOne({
        where: { id: updateProductoDto.categoriaId },
      })

      if (!categoria) {
        throw new BadRequestException(`Categoría con ID ${updateProductoDto.categoriaId} no encontrada`)
      }
    }

    await this.productosRepository.update(id, updateProductoDto)
    return this.findProductoById(id)
  }

  async removeProducto(id: number): Promise<void> {
    const producto = await this.findProductoById(id)
    await this.productosRepository.remove(producto)
  }

  // Métodos para categorías
  async createCategoria(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriasRepository.create(createCategoriaDto)
    return this.categoriasRepository.save(categoria)
  }

  async findAllCategorias(): Promise<Categoria[]> {
    return this.categoriasRepository.find()
  }

  async findCategoriaById(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOne({
      where: { id },
    })

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`)
    }

    return categoria
  }

  async updateCategoria(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findCategoriaById(id)

    await this.categoriasRepository.update(id, updateCategoriaDto)
    return this.findCategoriaById(id)
  }

  async removeCategoria(id: number): Promise<void> {
    const categoria = await this.findCategoriaById(id)

    // Verificar si hay productos asociados a esta categoría
    const productos = await this.productosRepository.find({
      where: { categoriaId: id },
    })

    if (productos.length > 0) {
      throw new BadRequestException(
        `No se puede eliminar la categoría porque tiene ${productos.length} productos asociados`,
      )
    }

    await this.categoriasRepository.remove(categoria)
  }
}

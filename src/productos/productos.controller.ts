import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger"
import { ProductosService } from "./productos.service"
import { CreateProductoDto } from "./dto/create-producto.dto"
import { UpdateProductoDto } from "./dto/update-producto.dto"
import { CreateCategoriaDto } from "./dto/create-categoria.dto"
import { UpdateCategoriaDto } from "./dto/update-categoria.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("productos")
@Controller("productos")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  // Endpoints para productos
  @Post()
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  createProducto(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.createProducto(createProductoDto);
  }

  @Get()
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: "Obtener todos los productos" })
  @ApiResponse({ status: 200, description: "Lista de productos" })
  @ApiQuery({ name: "categoria", required: false, description: "Filtrar por categoría" })
  @ApiQuery({ name: "estado", required: false, description: "Filtrar por estado" })
  async findAllProductos(@Query('categoria') categoriaId?: number, @Query('estado') estado?: string) {
    if (categoriaId) {
      return this.productosService.findProductosByCategoria(categoriaId)
    }

    if (estado) {
      return this.productosService.findProductosByEstado(estado)
    }

    return this.productosService.findAllProductos()
  }

  @Get(':id')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findProductoById(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findProductoById(id);
  }
  


  @Patch(":id")
  @Roles("Administrador", "Gerente")
  @ApiOperation({ summary: "Actualizar un producto" })
  @ApiResponse({ status: 200, description: "Producto actualizado exitosamente" })
  @ApiResponse({ status: 404, description: "Producto no encontrado" })
  updateProducto(@Param('id', ParseIntPipe) id: number, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.updateProducto(id, updateProductoDto)
  }

  @Delete(':id')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  removeProducto(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.removeProducto(id);
  }

  // Endpoints para categorías
  @Post('categorias')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
  createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.productosService.createCategoria(createCategoriaDto);
  }

  @Get('categorias/all')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: "Obtener todas las categorías" })
  @ApiResponse({ status: 200, description: "Lista de categorías" })
  async findAllCategorias() {
    return await this.productosService.findAllCategorias()
  }

  @Get('categorias/:id')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  findCategoriaById(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findCategoriaById(+id);
  }

  @Patch("categorias/:id")
  @Roles("Administrador", "Gerente")
  @ApiOperation({ summary: "Actualizar una categoría" })
  @ApiResponse({ status: 200, description: "Categoría actualizada exitosamente" })
  @ApiResponse({ status: 404, description: "Categoría no encontrada" })
  updateCategoria(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.productosService.updateCategoria(+id, updateCategoriaDto)
  }

  @Delete('categorias/:id')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  removeCategoria(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.removeCategoria(+id);
  }
}

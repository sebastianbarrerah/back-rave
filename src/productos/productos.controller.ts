import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger"
import { ProductosService } from "./productos.service"
import { CreateProductoDto } from "./dto/create-producto.dto"
import { UpdateProductoDto } from "./dto/update-producto.dto"
import { CreateCategoriaDto } from "./dto/create-categoria.dto"
import { UpdateCategoriaDto } from "./dto/update-categoria.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { Public } from "src/auth/decorators/public.decorator"

@Public()
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

  @Public()
  @Get()
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

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findProductoById(@Param('id') id: string) {
    return this.productosService.findProductoById(+id);
  }

  @Public()
  @Patch(":id")
  @Roles("Administrador", "Gerente")
  @ApiOperation({ summary: "Actualizar un producto" })
  @ApiResponse({ status: 200, description: "Producto actualizado exitosamente" })
  @ApiResponse({ status: 404, description: "Producto no encontrado" })
  updateProducto(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.updateProducto(+id, updateProductoDto)
  }

  @Public()
  @Delete(':id')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  removeProducto(@Param('id') id: string) {
    return this.productosService.removeProducto(+id);
  }

  // Endpoints para categorías
  @Public()
  @Post('categorias')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
  createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.productosService.createCategoria(createCategoriaDto);
  }

  @Get("categorias")
  @ApiOperation({ summary: "Obtener todas las categorías" })
  @ApiResponse({ status: 200, description: "Lista de categorías" })
  findAllCategorias() {
    return this.productosService.findAllCategorias()
  }

  @Get('categorias/:id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  findCategoriaById(@Param('id') id: string) {
    return this.productosService.findCategoriaById(+id);
  }

  @Patch("categorias/:id")
  @Roles("Administrador", "Gerente")
  @ApiOperation({ summary: "Actualizar una categoría" })
  @ApiResponse({ status: 200, description: "Categoría actualizada exitosamente" })
  @ApiResponse({ status: 404, description: "Categoría no encontrada" })
  updateCategoria(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.productosService.updateCategoria(+id, updateCategoriaDto)
  }

  @Delete('categorias/:id')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  removeCategoria(@Param('id') id: string) {
    return this.productosService.removeCategoria(+id);
  }
}

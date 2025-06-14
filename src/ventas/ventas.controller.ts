import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger"
import { VentasService } from "./ventas.service"
import { CreateVentaDto } from "./dto/create-venta.dto"
import { UpdateVentaDto } from "./dto/update-venta.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("ventas")
@Controller("ventas")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("Administrador", "Gerente")
@ApiBearerAuth()
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @Roles("Administrador", "Gerente")
  @ApiOperation({ summary: 'Crear una nueva venta' })
  @ApiResponse({ status: 201, description: 'Venta creada exitosamente' })
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  @Get()
  @Roles("Administrador", "Gerente")
  @ApiOperation({ summary: "Obtener todas las ventas" })
  @ApiResponse({ status: 200, description: "Lista de ventas" })
  @ApiQuery({ name: "cliente", required: false, description: "Filtrar por cliente" })
  @ApiQuery({ name: "vendedor", required: false, description: "Filtrar por vendedor" })
  @ApiQuery({ name: "fechaInicio", required: false, description: "Filtrar por fecha de inicio" })
  @ApiQuery({ name: "fechaFin", required: false, description: "Filtrar por fecha de fin" })
  async findAll(
    @Query('cliente') clienteId?: number,
    @Query('vendedor') vendedorId?: number,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    if (clienteId) {
      return this.ventasService.findByCliente(clienteId)
    }

    if (vendedorId) {
      return this.ventasService.findByVendedor(vendedorId)
    }

    if (fechaInicio && fechaFin) {
      return this.ventasService.findByFecha(new Date(fechaInicio), new Date(fechaFin))
    }

  const ventasTotales = await this.ventasService.findAll()
  return ventasTotales.length > 0 ? ventasTotales : []
  }

  @Get(':id')
  @Roles("Administrador", "Gerente")
  @ApiOperation({ summary: 'Obtener una venta por ID' })
  @ApiResponse({ status: 200, description: 'Venta encontrada' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  findOne(@Param('id') id: string) {
    return this.ventasService.findOne(+id);
  }

  @Patch(":id")
  @Roles("Administrador", "Gerente")
  @ApiOperation({ summary: "Actualizar una venta" })
  @ApiResponse({ status: 200, description: "Venta actualizada exitosamente" })
  @ApiResponse({ status: 404, description: "Venta no encontrada" })
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventasService.update(+id, updateVentaDto)
  }

  @Delete(':id')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Eliminar una venta' })
  @ApiResponse({ status: 200, description: 'Venta eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  remove(@Param('id') id: string) {
    return this.ventasService.remove(+id);
  }
}


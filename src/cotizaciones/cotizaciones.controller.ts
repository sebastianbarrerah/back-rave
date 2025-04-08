import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger"
import { CotizacionesService } from "./cotizaciones.service"
import { CreateCotizacionDto } from "./dto/create-cotizacion.dto"
import { UpdateCotizacionDto } from "./dto/update-cotizacion.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("cotizaciones")
@Controller("cotizaciones")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CotizacionesController {
  constructor(private readonly cotizacionesService: CotizacionesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cotización' })
  @ApiResponse({ status: 201, description: 'Cotización creada exitosamente' })
  create(@Body() createCotizacionDto: CreateCotizacionDto) {
    return this.cotizacionesService.create(createCotizacionDto);
  }

  @Get()
  @ApiOperation({ summary: "Obtener todas las cotizaciones" })
  @ApiResponse({ status: 200, description: "Lista de cotizaciones" })
  @ApiQuery({ name: "cliente", required: false, description: "Filtrar por cliente" })
  @ApiQuery({ name: "vendedor", required: false, description: "Filtrar por vendedor" })
  @ApiQuery({ name: "estado", required: false, description: "Filtrar por estado" })
  @ApiQuery({ name: "fechaInicio", required: false, description: "Filtrar por fecha de inicio" })
  @ApiQuery({ name: "fechaFin", required: false, description: "Filtrar por fecha de fin" })
  async findAll(
    @Query('cliente') clienteId?: number,
    @Query('vendedor') vendedorId?: number,
    @Query('estado') estado?: string,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    if (clienteId) {
      return this.cotizacionesService.findByCliente(clienteId)
    }

    if (vendedorId) {
      return this.cotizacionesService.findByVendedor(vendedorId)
    }

    if (estado) {
      return this.cotizacionesService.findByEstado(estado)
    }

    if (fechaInicio && fechaFin) {
      return this.cotizacionesService.findByFecha(new Date(fechaInicio), new Date(fechaFin))
    }

    return this.cotizacionesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cotización por ID' })
  @ApiResponse({ status: 200, description: 'Cotización encontrada' })
  @ApiResponse({ status: 404, description: 'Cotización no encontrada' })
  findOne(@Param('id') id: string) {
    return this.cotizacionesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Actualizar una cotización" })
  @ApiResponse({ status: 200, description: "Cotización actualizada exitosamente" })
  @ApiResponse({ status: 404, description: "Cotización no encontrada" })
  update(@Param('id') id: string, @Body() updateCotizacionDto: UpdateCotizacionDto) {
    return this.cotizacionesService.update(+id, updateCotizacionDto)
  }

  @Delete(':id')
  @Roles('Administrador', 'Gerente')
  @ApiOperation({ summary: 'Eliminar una cotización' })
  @ApiResponse({ status: 200, description: 'Cotización eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Cotización no encontrada' })
  remove(@Param('id') id: string) {
    return this.cotizacionesService.remove(+id);
  }
}

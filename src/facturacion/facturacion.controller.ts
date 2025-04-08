import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger"
import { FacturacionService } from "./facturacion.service"
import { CreateFacturaDto } from "./dto/create-factura.dto"
import { UpdateFacturaDto } from "./dto/update-factura.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("facturacion")
@Controller("facturacion")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class FacturacionController {
  constructor(private readonly facturacionService: FacturacionService) {}

  @Post()
  @Roles('Administrador', 'Contador')
  @ApiOperation({ summary: 'Crear una nueva factura' })
  @ApiResponse({ status: 201, description: 'Factura creada exitosamente' })
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturacionService.create(createFacturaDto);
  }

  @Get()
  @ApiOperation({ summary: "Obtener todas las facturas" })
  @ApiResponse({ status: 200, description: "Lista de facturas" })
  @ApiQuery({ name: "cliente", required: false, description: "Filtrar por cliente" })
  @ApiQuery({ name: "estado", required: false, description: "Filtrar por estado" })
  @ApiQuery({ name: "fechaInicio", required: false, description: "Filtrar por fecha de inicio" })
  @ApiQuery({ name: "fechaFin", required: false, description: "Filtrar por fecha de fin" })
  async findAll(
    @Query('cliente') clienteId?: number,
    @Query('estado') estado?: string,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    if (clienteId) {
      return this.facturacionService.findByCliente(clienteId)
    }

    if (estado) {
      return this.facturacionService.findByEstado(estado)
    }

    if (fechaInicio && fechaFin) {
      return this.facturacionService.findByFecha(new Date(fechaInicio), new Date(fechaFin))
    }

    return this.facturacionService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura por ID' })
  @ApiResponse({ status: 200, description: 'Factura encontrada' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  findOne(@Param('id') id: string) {
    return this.facturacionService.findOne(+id);
  }

  @Patch(":id")
  @Roles("Administrador", "Contador")
  @ApiOperation({ summary: "Actualizar una factura" })
  @ApiResponse({ status: 200, description: "Factura actualizada exitosamente" })
  @ApiResponse({ status: 404, description: "Factura no encontrada" })
  update(@Param('id') id: string, @Body() updateFacturaDto: UpdateFacturaDto) {
    return this.facturacionService.update(+id, updateFacturaDto)
  }

  @Delete(':id')
  @Roles('Administrador')
  @ApiOperation({ summary: 'Eliminar una factura' })
  @ApiResponse({ status: 200, description: 'Factura eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  remove(@Param('id') id: string) {
    return this.facturacionService.remove(+id);
  }
}

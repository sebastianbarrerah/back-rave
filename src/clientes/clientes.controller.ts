import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { ClientesService } from "./clientes.service"
import { CreateClienteDto } from "./dto/create-cliente.dto"
import { UpdateClienteDto } from "./dto/update-cliente.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("clientes")
@Controller("clientes")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Crear un nuevo cliente" })
  @ApiResponse({ status: 201, description: "Cliente creado exitosamente" })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto)
  }

  @Get()
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Obtener todos los clientes" })
  @ApiResponse({ status: 200, description: "Lista de clientes" })
  findAll() {
    return this.clientesService.findAll()
  }

  @Get("documento/:documento")
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Buscar un cliente por documento" })
  @ApiResponse({ status: 200, description: "Cliente encontrado" })
  @ApiResponse({ status: 404, description: "Cliente no encontrado" })
  findByDocumento(@Param("documento") documento: string) {
    return this.clientesService.findByDocumento(documento)
  }

  @Get(":id")
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Obtener un cliente por ID" })
  @ApiResponse({ status: 200, description: "Cliente encontrado" })
  @ApiResponse({ status: 404, description: "Cliente no encontrado" })
  findOne(@Param("id") id: string) {
    return this.clientesService.findOne(+id)
  }

  @Patch(":id")
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Actualizar un cliente" })
  @ApiResponse({ status: 200, description: "Cliente actualizado exitosamente" })
  @ApiResponse({ status: 404, description: "Cliente no encontrado" })
  update(@Param("id") id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(+id, updateClienteDto)
  }

  @Delete(":id")
  @Roles("Administrador")
  @ApiOperation({ summary: "Eliminar un cliente" })
  @ApiResponse({ status: 200, description: "Cliente eliminado exitosamente" })
  @ApiResponse({ status: 404, description: "Cliente no encontrado" })
  remove(@Param("id") id: string) {
    return this.clientesService.remove(+id)
  }
}

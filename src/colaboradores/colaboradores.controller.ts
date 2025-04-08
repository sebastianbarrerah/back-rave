import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { ColaboradoresService } from "./colaboradores.service"
import { CreateColaboradorDto } from "./dto/create-colaborador.dto"
import { UpdateColaboradorDto } from "./dto/update-colaborador.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("colaboradores")
@Controller("colaboradores")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ColaboradoresController {
  constructor(private readonly colaboradoresService: ColaboradoresService) {}

  @Post()
  @Roles("Administrador")
  @ApiOperation({ summary: "Crear un nuevo colaborador" })
  @ApiResponse({ status: 201, description: "Colaborador creado exitosamente" })
  create(@Body() createColaboradorDto: CreateColaboradorDto) {
    return this.colaboradoresService.create(createColaboradorDto)
  }

  @Get()
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Obtener todos los colaboradores" })
  @ApiResponse({ status: 200, description: "Lista de colaboradores" })
  findAll() {
    return this.colaboradoresService.findAll()
  }

  @Get(":id")
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Obtener un colaborador por ID" })
  @ApiResponse({ status: 200, description: "Colaborador encontrado" })
  @ApiResponse({ status: 404, description: "Colaborador no encontrado" })
  findOne(@Param("id") id: string) {
    return this.colaboradoresService.findOne(+id)
  }

  @Patch(":id")
  @Roles("Administrador")
  @ApiOperation({ summary: "Actualizar un colaborador" })
  @ApiResponse({ status: 200, description: "Colaborador actualizado exitosamente" })
  @ApiResponse({ status: 404, description: "Colaborador no encontrado" })
  update(@Param("id") id: string, @Body() updateColaboradorDto: UpdateColaboradorDto) {
    return this.colaboradoresService.update(+id, updateColaboradorDto)
  }

  @Delete(":id")
  @Roles("Administrador")
  @ApiOperation({ summary: "Eliminar un colaborador" })
  @ApiResponse({ status: 200, description: "Colaborador eliminado exitosamente" })
  @ApiResponse({ status: 404, description: "Colaborador no encontrado" })
  remove(@Param("id") id: string) {
    return this.colaboradoresService.remove(+id)
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { RolesService } from "./roles.service"
import { CreateRoleDto } from "./dto/create-role.dto"
import { UpdateRoleDto } from "./dto/update-role.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("roles")
@Controller("roles")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles("Administrador")
  @ApiOperation({ summary: "Crear un nuevo rol" })
  @ApiResponse({ status: 201, description: "Rol creado exitosamente" })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto)
  }

  @Get()
  @Roles("Administrador")
  @ApiOperation({ summary: "Obtener todos los roles" })
  @ApiResponse({ status: 200, description: "Lista de roles" })
  findAll() {
    return this.rolesService.findAll()
  }

  @Get(":id")
  @Roles("Administrador")
  @ApiOperation({ summary: "Obtener un rol por ID" })
  @ApiResponse({ status: 200, description: "Rol encontrado" })
  @ApiResponse({ status: 404, description: "Rol no encontrado" })
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(+id)
  }

  @Patch(":id")
  @Roles("Administrador")
  @ApiOperation({ summary: "Actualizar un rol" })
  @ApiResponse({ status: 200, description: "Rol actualizado exitosamente" })
  @ApiResponse({ status: 404, description: "Rol no encontrado" })
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto)
  }

  @Delete(":id")
  @Roles("Administrador")
  @ApiOperation({ summary: "Eliminar un rol" })
  @ApiResponse({ status: 200, description: "Rol eliminado exitosamente" })
  @ApiResponse({ status: 404, description: "Rol no encontrado" })
  remove(@Param("id") id: string) {
    return this.rolesService.remove(+id)
  }
}

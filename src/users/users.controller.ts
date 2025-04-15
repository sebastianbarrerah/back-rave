import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { Roles } from "../auth/decorators/roles.decorator"
import { Public } from "src/auth/decorators/public.decorator"

@ApiTags("users")
@Controller("users")

export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  @Public()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles("Administrador")
  @ApiOperation({ summary: "Obtener todos los usuarios" })
  @ApiResponse({ status: 200, description: "Lista de usuarios" })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @Roles('Administrador')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @Roles("Administrador")
  @ApiOperation({ summary: "Actualizar un usuario" })
  @ApiResponse({ status: 200, description: "Usuario actualizado exitosamente" })
  @ApiResponse({ status: 404, description: "Usuario no encontrado" })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @Roles('Administrador')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

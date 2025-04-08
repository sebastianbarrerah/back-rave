import { PartialType } from "@nestjs/swagger"
import { CreateUserDto } from "./create-user.dto"
import { IsOptional, IsString, IsEmail, MinLength, IsBoolean, IsArray } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { Role } from "../../roles/entities/role.entity"

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: "Juan Pérez" })
  @IsOptional()
  @IsString({ message: "El nombre debe ser un texto" })
  name?: string

  @ApiPropertyOptional({ example: "usuario@ejemplo.com" })
  @IsOptional()
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  email?: string

  @ApiPropertyOptional({ example: "password123" })
  @IsOptional()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password?: string

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @ApiPropertyOptional({ type: [Role] })
  @IsOptional()
  @IsArray()
  roles?: Role[]
}

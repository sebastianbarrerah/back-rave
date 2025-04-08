import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional, IsBoolean, IsArray } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Role } from "../../roles/entities/role.entity"

export class CreateUserDto {
  @ApiProperty({ example: "Juan Pérez" })
  @IsNotEmpty({ message: "El nombre es requerido" })
  @IsString({ message: "El nombre debe ser un texto" })
  name: string

  @ApiProperty({ example: "usuario@ejemplo.com" })
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  @IsNotEmpty({ message: "El email es requerido" })
  email: string

  @ApiProperty({ example: "password123" })
  @IsNotEmpty({ message: "La contraseña es requerida" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password: string

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @ApiPropertyOptional({ type: [Role] })
  @IsOptional()
  @IsArray()
  roles?: Role[]
}

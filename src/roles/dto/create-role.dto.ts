import { IsNotEmpty, IsString, IsArray, IsOptional } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateRoleDto {
  @ApiProperty({ example: "Administrador" })
  @IsNotEmpty({ message: "El nombre es requerido" })
  @IsString({ message: "El nombre debe ser un texto" })
  nombre: string

  @ApiProperty({ example: "Acceso total al sistema" })
  @IsNotEmpty({ message: "La descripción es requerida" })
  @IsString({ message: "La descripción debe ser un texto" })
  descripcion: string

  @ApiPropertyOptional({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  permisos?: number[]
}

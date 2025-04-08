import { PartialType } from "@nestjs/swagger"
import { CreateRoleDto } from "./create-role.dto"
import { IsOptional, IsString, IsArray } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiPropertyOptional({ example: "Administrador" })
  @IsOptional()
  @IsString({ message: "El nombre debe ser un texto" })
  nombre?: string

  @ApiPropertyOptional({ example: "Acceso total al sistema" })
  @IsOptional()
  @IsString({ message: "La descripción debe ser un texto" })
  descripcion?: string

  @ApiPropertyOptional({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  permisos?: number[]
}

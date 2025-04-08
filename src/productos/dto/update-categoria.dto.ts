import { PartialType } from "@nestjs/swagger"
import { CreateCategoriaDto } from "./create-categoria.dto"
import { IsOptional, IsString } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @ApiPropertyOptional({ example: "Baño" })
  @IsOptional()
  @IsString({ message: "El nombre debe ser un texto" })
  nombre?: string

  @ApiPropertyOptional({ example: "Productos para el baño" })
  @IsOptional()
  @IsString({ message: "La descripción debe ser un texto" })
  descripcion?: string
}

import { IsNotEmpty, IsString, IsOptional } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateCategoriaDto {
  @ApiProperty({ example: "Baño" })
  @IsNotEmpty({ message: "El nombre es requerido" })
  @IsString({ message: "El nombre debe ser un texto" })
  nombre: string

  @ApiPropertyOptional({ example: "Productos para el baño" })
  @IsOptional()
  @IsString({ message: "La descripción debe ser un texto" })
  descripcion?: string
}

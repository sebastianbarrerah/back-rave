import { PartialType } from "@nestjs/swagger"
import { CreateProductoDto } from "./create-producto.dto"
import { IsOptional, IsString, IsNumber, IsEnum, Min } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

enum EstadoProducto {
  DISPONIBLE = "Disponible",
  BAJO_STOCK = "Bajo Stock",
  AGOTADO = "Agotado",
}

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  @ApiPropertyOptional({ example: "PRD-1001" })
  @IsOptional()
  @IsString({ message: "El código debe ser un texto" })
  codigo?: string

  @ApiPropertyOptional({ example: "ESPONJA CUERPO SUAVE" })
  @IsOptional()
  @IsString({ message: "El nombre debe ser un texto" })
  nombre?: string

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: "La categoría debe ser un número" })
  categoriaId?: number

  @ApiPropertyOptional({ example: 120 })
  @IsOptional()
  @IsNumber({}, { message: "El stock debe ser un número" })
  @Min(0, { message: "El stock no puede ser negativo" })
  stock?: number

  @ApiPropertyOptional({ example: 120 })
  @IsOptional()
  @IsNumber({}, { message: "El precio debe ser un número" })
  @Min(0, { message: "El precio no puede ser negativo" })
  precio?: number

  @ApiPropertyOptional({ example: 80 })
  @IsOptional()
  @IsNumber({}, { message: "El costo debe ser un número" })
  @Min(0, { message: "El costo no puede ser negativo" })
  costo?: number

  @ApiPropertyOptional({ enum: EstadoProducto, example: EstadoProducto.DISPONIBLE })
  @IsOptional()
  @IsEnum(EstadoProducto, { message: "El estado debe ser Disponible, Bajo Stock o Agotado" })
  estado?: string

  @ApiPropertyOptional({ example: "/placeholder.svg?height=100&width=100" })
  @IsOptional()
  @IsString({ message: "La imagen debe ser un texto" })
  imagen?: string

  @ApiPropertyOptional({ example: "Esponja suave para el cuerpo, ideal para la limpieza diaria." })
  @IsOptional()
  @IsString({ message: "La descripción debe ser un texto" })
  descripcion?: string
}

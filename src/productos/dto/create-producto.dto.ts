import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, Min } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

enum EstadoProducto {
  DISPONIBLE = "Disponible",
  BAJO_STOCK = "Bajo Stock",
  AGOTADO = "Agotado",
}

export class CreateProductoDto {
  @ApiProperty({ example: "PRD-1001" })
  @IsNotEmpty({ message: "El código es requerido" })
  @IsString({ message: "El código debe ser un texto" })
  codigo: string

  @ApiProperty({ example: "ESPONJA CUERPO SUAVE" })
  @IsNotEmpty({ message: "El nombre es requerido" })
  @IsString({ message: "El nombre debe ser un texto" })
  nombre: string

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "La categoría es requerida" })
  @IsNumber({}, { message: "La categoría debe ser un número" })
  categoriaId: number

  @ApiProperty({ example: 120 })
  @IsNotEmpty({ message: "El stock es requerido" })
  @IsNumber({}, { message: "El stock debe ser un número" })
  @Min(0, { message: "El stock no puede ser negativo" })
  stock: number

  @ApiProperty({ example: 120 })
  @IsNotEmpty({ message: "El precio es requerido" })
  @IsNumber({}, { message: "El precio debe ser un número" })
  @Min(0, { message: "El precio no puede ser negativo" })
  precio: number

  @ApiProperty({ example: 80 })
  @IsNotEmpty({ message: "El costo es requerido" })
  @IsNumber({}, { message: "El costo debe ser un número" })
  @Min(0, { message: "El costo no puede ser negativo" })
  costo: number

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

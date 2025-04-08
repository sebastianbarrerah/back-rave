import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreatePlantillaDto {
  @ApiProperty({ example: "Factura Comercial" })
  @IsNotEmpty({ message: "El nombre es requerido" })
  @IsString({ message: "El nombre debe ser un texto" })
  nombre: string

  @ApiProperty({ example: "Plantilla estándar para facturas comerciales" })
  @IsNotEmpty({ message: "La descripción es requerida" })
  @IsString({ message: "La descripción debe ser un texto" })
  descripcion: string

  @ApiProperty({ example: "Facturas" })
  @IsNotEmpty({ message: "La categoría es requerida" })
  @IsString({ message: "La categoría debe ser un texto" })
  categoria: string

  @ApiPropertyOptional({ example: "Contenido de la plantilla en formato base64 o texto" })
  @IsOptional()
  @IsString({ message: "El contenido debe ser un texto" })
  contenido?: string

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber({}, { message: "El número de descargas debe ser un número" })
  descargas?: number
}

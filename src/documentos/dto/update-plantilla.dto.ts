import { PartialType } from "@nestjs/swagger"
import { CreatePlantillaDto } from "./create-plantilla.dto"
import { IsOptional, IsString, IsNumber } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

export class UpdatePlantillaDto extends PartialType(CreatePlantillaDto) {
  @ApiPropertyOptional({ example: "Factura Comercial" })
  @IsOptional()
  @IsString({ message: "El nombre debe ser un texto" })
  nombre?: string

  @ApiPropertyOptional({ example: "Plantilla estándar para facturas comerciales" })
  @IsOptional()
  @IsString({ message: "La descripción debe ser un texto" })
  descripcion?: string

  @ApiPropertyOptional({ example: "Facturas" })
  @IsOptional()
  @IsString({ message: "La categoría debe ser un texto" })
  categoria?: string

  @ApiPropertyOptional({ example: "Contenido de la plantilla en formato base64 o texto" })
  @IsOptional()
  @IsString({ message: "El contenido debe ser un texto" })
  contenido?: string

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber({}, { message: "El número de descargas debe ser un número" })
  descargas?: number
}

import { PartialType } from "@nestjs/swagger"
import { CreateCotizacionDto } from "./create-cotizacion.dto"
import { IsOptional, IsEnum, IsArray, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { CreateDetalleCotizacionDto } from "./create-detalle-cotizacion.dto"

enum EstadoCotizacion {
  PENDIENTE = "Pendiente",
  APROBADA = "Aprobada",
  RECHAZADA = "Rechazada",
}

export class UpdateCotizacionDto extends PartialType(CreateCotizacionDto) {
  @ApiPropertyOptional({ enum: EstadoCotizacion, example: EstadoCotizacion.APROBADA })
  @IsOptional()
  @IsEnum(EstadoCotizacion, { message: "El estado debe ser Pendiente, Aprobada o Rechazada" })
  estado?: string

  @ApiPropertyOptional({ type: [CreateDetalleCotizacionDto] })
  @IsOptional()
  @IsArray({ message: "Los detalles deben ser un arreglo" })
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleCotizacionDto)
  detalles?: CreateDetalleCotizacionDto[]
}

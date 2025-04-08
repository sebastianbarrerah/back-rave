import { IsNotEmpty, IsNumber, IsArray, ValidateNested, IsOptional, IsEnum } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { CreateDetalleCotizacionDto } from "./create-detalle-cotizacion.dto"

enum EstadoCotizacion {
  PENDIENTE = "Pendiente",
  APROBADA = "Aprobada",
  RECHAZADA = "Rechazada",
}

export class CreateCotizacionDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "El cliente es requerido" })
  @IsNumber({}, { message: "El cliente debe ser un número" })
  clienteId: number

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "El vendedor es requerido" })
  @IsNumber({}, { message: "El vendedor debe ser un número" })
  vendedorId: number

  @ApiProperty({ type: [CreateDetalleCotizacionDto] })
  @IsArray({ message: "Los detalles deben ser un arreglo" })
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleCotizacionDto)
  detalles: CreateDetalleCotizacionDto[]

  @ApiPropertyOptional({ enum: EstadoCotizacion, example: EstadoCotizacion.PENDIENTE })
  @IsOptional()
  @IsEnum(EstadoCotizacion, { message: "El estado debe ser Pendiente, Aprobada o Rechazada" })
  estado?: string
}

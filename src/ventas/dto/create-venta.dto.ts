import { IsNotEmpty, IsNumber, IsArray, ValidateNested, IsOptional, IsEnum } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { CreateDetalleVentaDto } from "./create-detalle-venta.dto"

enum EstadoVenta {
  COMPLETADA = "Completada",
  PENDIENTE = "Pendiente",
  CANCELADA = "Cancelada",
}

export class CreateVentaDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "El cliente es requerido" })
  @IsNumber({}, { message: "El cliente debe ser un número" })
  clienteId: number

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "El vendedor es requerido" })
  @IsNumber({}, { message: "El vendedor debe ser un número" })
  vendedorId: number

  @ApiProperty({ type: [CreateDetalleVentaDto] })
  @IsArray({ message: "Los detalles deben ser un arreglo" })
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleVentaDto)
  detalles: CreateDetalleVentaDto[]

  @ApiPropertyOptional({ enum: EstadoVenta, example: EstadoVenta.COMPLETADA })
  @IsOptional()
  @IsEnum(EstadoVenta, { message: "El estado debe ser Completada, Pendiente o Cancelada" })
  estado?: string
}

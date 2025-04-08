import { IsNotEmpty, IsNumber, IsArray, ValidateNested, IsOptional, IsEnum } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { CreateDetalleFacturaDto } from "./create-detalle-factura.dto"

enum EstadoFactura {
  EMITIDA = "Emitida",
  PENDIENTE = "Pendiente",
}

export class CreateFacturaDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "El cliente es requerido" })
  @IsNumber({}, { message: "El cliente debe ser un número" })
  clienteId: number

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: "La venta debe ser un número" })
  ventaId?: number

  @ApiPropertyOptional({ type: [CreateDetalleFacturaDto] })
  @IsOptional()
  @IsArray({ message: "Los detalles deben ser un arreglo" })
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleFacturaDto)
  detalles?: CreateDetalleFacturaDto[]

  @ApiPropertyOptional({ enum: EstadoFactura, example: EstadoFactura.EMITIDA })
  @IsOptional()
  @IsEnum(EstadoFactura, { message: "El estado debe ser Emitida o Pendiente" })
  estado?: string
}

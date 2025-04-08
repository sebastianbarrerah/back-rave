import { PartialType } from "@nestjs/swagger"
import { CreateVentaDto } from "./create-venta.dto"
import { IsOptional, IsEnum } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

enum EstadoVenta {
  COMPLETADA = "Completada",
  PENDIENTE = "Pendiente",
  CANCELADA = "Cancelada",
}

export class UpdateVentaDto extends PartialType(CreateVentaDto) {
  @ApiPropertyOptional({ enum: EstadoVenta, example: EstadoVenta.COMPLETADA })
  @IsOptional()
  @IsEnum(EstadoVenta, { message: "El estado debe ser Completada, Pendiente o Cancelada" })
  estado?: string
}

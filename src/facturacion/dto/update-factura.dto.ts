import { PartialType } from "@nestjs/swagger"
import { CreateFacturaDto } from "./create-factura.dto"
import { IsOptional, IsEnum } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

enum EstadoFactura {
  EMITIDA = "Emitida",
  PENDIENTE = "Pendiente",
}

export class UpdateFacturaDto extends PartialType(CreateFacturaDto) {
  @ApiPropertyOptional({ enum: EstadoFactura, example: EstadoFactura.EMITIDA })
  @IsOptional()
  @IsEnum(EstadoFactura, { message: "El estado debe ser Emitida o Pendiente" })
  estado?: string
}

import { IsNotEmpty, IsNumber, Min } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateDetalleCotizacionDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "El producto es requerido" })
  @IsNumber({}, { message: "El producto debe ser un número" })
  productoId: number

  @ApiProperty({ example: 2 })
  @IsNotEmpty({ message: "La cantidad es requerida" })
  @IsNumber({}, { message: "La cantidad debe ser un número" })
  @Min(1, { message: "La cantidad debe ser mayor a 0" })
  cantidad: number
}

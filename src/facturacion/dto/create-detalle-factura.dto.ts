import { IsNotEmpty, IsNumber, Min } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateDetalleFacturaDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "El producto es requerido" })
  @IsNumber({}, { message: "El producto debe ser un número" })
  productoId: number

  @ApiProperty({ example: 2 })
  @IsNotEmpty({ message: "La cantidad es requerida" })
  @IsNumber({}, { message: "La cantidad debe ser un número" })
  @Min(1, { message: "La cantidad debe ser mayor a 0" })
  cantidad: number

  @ApiProperty({ example: 120 })
  @IsNotEmpty({ message: "El precio unitario es requerido" })
  @IsNumber({}, { message: "El precio unitario debe ser un número" })
  @Min(0, { message: "El precio unitario no puede ser negativo" })
  precioUnitario: number
}

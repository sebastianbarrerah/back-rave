import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCertificadoDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "El colaborador es requerido" })
  @IsNumber({}, { message: "El colaborador debe ser un número" })
  colaboradorId: number

  @ApiProperty({ example: "15/01/2020" })
  @IsNotEmpty({ message: "La fecha de inicio es requerida" })
  @IsString({ message: "La fecha de inicio debe ser un texto" })
  fechaInicio: string

  @ApiProperty({ example: "30/04/2024" })
  @IsNotEmpty({ message: "La fecha de fin es requerida" })
  @IsString({ message: "La fecha de fin debe ser un texto" })
  fechaFin: string

  @ApiProperty({ example: "3500" })
  @IsNotEmpty({ message: "El sueldo es requerido" })
  @IsString({ message: "El sueldo debe ser un texto" })
  sueldo: string
}

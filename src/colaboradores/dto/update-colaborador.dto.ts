import { PartialType } from "@nestjs/swagger"
import { CreateColaboradorDto } from "./create-colaborador.dto"
import { IsOptional, IsString, IsEmail, IsEnum, IsPhoneNumber } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

enum Cargo {
  VENDEDOR = "Vendedor",
  ADMINISTRADOR = "Administrador",
  CONTADOR = "Contador",
  GERENTE = "Gerente",
}

export class UpdateColaboradorDto extends PartialType(CreateColaboradorDto) {
  @ApiPropertyOptional({ example: "Juan Pérez" })
  @IsOptional()
  @IsString({ message: "El nombre debe ser un texto" })
  nombre?: string

  @ApiPropertyOptional({ example: "12345678" })
  @IsOptional()
  @IsString({ message: "El documento debe ser un texto" })
  documento?: string

  @ApiPropertyOptional({ example: "colaborador@ejemplo.com" })
  @IsOptional()
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  email?: string

  @ApiPropertyOptional({ example: "+573001234567" })
  @IsOptional()
  @IsPhoneNumber(null, { message: "El teléfono debe tener un formato válido" })
  telefono?: string

  @ApiPropertyOptional({ enum: Cargo, example: Cargo.VENDEDOR })
  @IsOptional()
  @IsEnum(Cargo, { message: "El cargo debe ser uno de los valores permitidos" })
  cargo?: Cargo

  @ApiPropertyOptional({ example: "Calle 123 #45-67" })
  @IsOptional()
  @IsString({ message: "La dirección debe ser un texto" })
  direccion?: string

  @ApiPropertyOptional({ example: "Notas adicionales" })
  @IsOptional()
  @IsString({ message: "Las observaciones deben ser un texto" })
  observaciones?: string
}

import { PartialType } from "@nestjs/swagger"
import { CreateClienteDto } from "./create-cliente.dto"
import { IsOptional, IsString, IsEmail, IsEnum, IsPhoneNumber } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

enum TipoCliente {
  PERSONA = "Persona",
  EMPRESA = "Empresa",
}

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @ApiPropertyOptional({ example: "Juan Pérez" })
  @IsOptional()
  @IsString({ message: "El nombre debe ser un texto" })
  nombre?: string

  @ApiPropertyOptional({ example: "12345678" })
  @IsOptional()
  @IsString({ message: "El documento debe ser un texto" })
  documento?: string

  @ApiPropertyOptional({ enum: TipoCliente, example: TipoCliente.PERSONA })
  @IsOptional()
  @IsEnum(TipoCliente, { message: "El tipo debe ser uno de los valores permitidos" })
  tipo?: TipoCliente

  @ApiPropertyOptional({ example: "cliente@ejemplo.com" })
  @IsOptional()
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  email?: string

  @ApiPropertyOptional({ example: "+573001234567" })
  @IsOptional()
  @IsPhoneNumber("ES", { message: "El teléfono debe tener un formato válido" })
  telefono?: string

  @ApiPropertyOptional({ example: "Calle 123 #45-67" })
  @IsOptional()
  @IsString({ message: "La dirección debe ser un texto" })
  direccion?: string

  @ApiPropertyOptional({ example: "Notas adicionales" })
  @IsOptional()
  @IsString({ message: "Las observaciones deben ser un texto" })
  observaciones?: string
}

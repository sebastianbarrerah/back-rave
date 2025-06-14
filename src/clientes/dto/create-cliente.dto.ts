import { IsNotEmpty, IsString, IsEmail, IsOptional, IsEnum, IsPhoneNumber } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

enum TipoCliente {
  PERSONA = "Persona",
  EMPRESA = "Empresa",
}

export class CreateClienteDto {
  @ApiProperty({ example: "Juan Pérez" })
  @IsNotEmpty({ message: "El nombre es requerido" })
  @IsString({ message: "El nombre debe ser un texto" })
  nombre: string

  @ApiProperty({ example: "12345678" })
  @IsNotEmpty({ message: "El documento es requerido" })
  @IsString({ message: "El documento debe ser un texto" })
  documento: string

  @ApiProperty({ enum: TipoCliente, example: TipoCliente.PERSONA })
  @IsEnum(TipoCliente, { message: "El tipo debe ser uno de los valores permitidos" })
  @IsNotEmpty({ message: "El tipo es requerido" })
  tipo: TipoCliente

  @ApiProperty({ example: "cliente@ejemplo.com" })
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  @IsNotEmpty({ message: "El email es requerido" })
  email: string

  @ApiProperty({ example: "+573001234567" })
  @IsNotEmpty({ message: "El teléfono es requerido" })
  telefono: string

  @ApiProperty({ example: "Calle 123 #45-67" })
  @IsNotEmpty({ message: "La dirección es requerida" })
  @IsString({ message: "La dirección debe ser un texto" })
  direccion: string

  @ApiPropertyOptional({ example: "Notas adicionales" })
  @IsOptional()
  @IsString({ message: "Las observaciones deben ser un texto" })
  observaciones?: string
}

import { IsNotEmpty, IsString, IsEmail, IsOptional, IsEnum, IsPhoneNumber } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

enum Cargo {
  VENDEDOR = "Vendedor",
  ADMINISTRADOR = "Administrador",
  CONTADOR = "Contador",
  GERENTE = "Gerente",
}

export class CreateColaboradorDto {
  @ApiProperty({ example: "Juan Pérez" })
  @IsNotEmpty({ message: "El nombre es requerido" })
  @IsString({ message: "El nombre debe ser un texto" })
  nombre: string

  @ApiProperty({ example: "12345678" })
  @IsNotEmpty({ message: "El documento es requerido" })
  @IsString({ message: "El documento debe ser un texto" })
  documento: string

  @ApiProperty({ example: "colaborador@ejemplo.com" })
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  @IsNotEmpty({ message: "El email es requerido" })
  email: string

  @ApiProperty({ example: "+573001234567" })
  @IsPhoneNumber(null, { message: "El teléfono debe tener un formato válido" })
  @IsNotEmpty({ message: "El teléfono es requerido" })
  telefono: string

  @ApiProperty({ enum: Cargo, example: Cargo.VENDEDOR })
  @IsEnum(Cargo, { message: "El cargo debe ser uno de los valores permitidos" })
  @IsNotEmpty({ message: "El cargo es requerido" })
  cargo: Cargo

  @ApiPropertyOptional({ example: "Calle 123 #45-67" })
  @IsOptional()
  @IsString({ message: "La dirección debe ser un texto" })
  direccion?: string

  @ApiPropertyOptional({ example: "Notas adicionales" })
  @IsOptional()
  @IsString({ message: "Las observaciones deben ser un texto" })
  observaciones?: string
}

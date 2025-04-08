import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
  @ApiProperty({ example: "usuario@ejemplo.com" })
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  @IsNotEmpty({ message: "El email es requerido" })
  email: string

  @ApiProperty({ example: "password123" })
  @IsNotEmpty({ message: "La contraseña es requerida" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password: string
}

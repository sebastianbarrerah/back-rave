import { IsNotEmpty, IsString, IsOptional, IsEnum } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

enum TipoDocumento {
  FACTURA = "Factura",
  COTIZACION = "Cotización",
  NOTA = "Nota",
  RECIBO = "Recibo",
  ORDEN = "Orden",
  COMPROBANTE = "Comprobante",
  CERTIFICADO = "Certificado",
}

enum FormatoDocumento {
  PDF = "PDF",
  DOCX = "DOCX",
  XLSX = "XLSX",
}

enum EstadoDocumento {
  ACTIVO = "Activo",
  INACTIVO = "Inactivo",
}

export class CreateDocumentoDto {
  @ApiProperty({ example: "Factura Estándar" })
  @IsNotEmpty({ message: "El nombre es requerido" })
  @IsString({ message: "El nombre debe ser un texto" })
  nombre: string

  @ApiProperty({ enum: TipoDocumento, example: TipoDocumento.FACTURA })
  @IsNotEmpty({ message: "El tipo es requerido" })
  @IsEnum(TipoDocumento, { message: "El tipo debe ser válido" })
  tipo: string

  @ApiProperty({ enum: FormatoDocumento, example: FormatoDocumento.PDF })
  @IsNotEmpty({ message: "El formato es requerido" })
  @IsEnum(FormatoDocumento, { message: "El formato debe ser válido" })
  formato: string

  @ApiPropertyOptional({ example: "Contenido del documento en formato base64 o texto" })
  @IsOptional()
  @IsString({ message: "El contenido debe ser un texto" })
  contenido?: string

  @ApiPropertyOptional({ enum: EstadoDocumento, example: EstadoDocumento.ACTIVO })
  @IsOptional()
  @IsEnum(EstadoDocumento, { message: "El estado debe ser Activo o Inactivo" })
  estado?: string
}

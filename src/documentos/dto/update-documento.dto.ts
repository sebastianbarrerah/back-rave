import { PartialType } from "@nestjs/swagger"
import { CreateDocumentoDto } from "./create-documento.dto"
import { IsOptional, IsString, IsEnum } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

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

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {
  @ApiPropertyOptional({ example: "Factura Estándar" })
  @IsOptional()
  @IsString({ message: "El nombre debe ser un texto" })
  nombre?: string

  @ApiPropertyOptional({ enum: TipoDocumento, example: TipoDocumento.FACTURA })
  @IsOptional()
  @IsEnum(TipoDocumento, { message: "El tipo debe ser válido" })
  tipo?: string

  @ApiPropertyOptional({ enum: FormatoDocumento, example: FormatoDocumento.PDF })
  @IsOptional()
  @IsEnum(FormatoDocumento, { message: "El formato debe ser válido" })
  formato?: string

  @ApiPropertyOptional({ example: "Contenido del documento en formato base64 o texto" })
  @IsOptional()
  @IsString({ message: "El contenido debe ser un texto" })
  contenido?: string

  @ApiPropertyOptional({ enum: EstadoDocumento, example: EstadoDocumento.ACTIVO })
  @IsOptional()
  @IsEnum(EstadoDocumento, { message: "El estado debe ser Activo o Inactivo" })
  estado?: string
}

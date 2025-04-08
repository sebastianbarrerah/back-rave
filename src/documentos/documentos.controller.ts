// import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common"
// import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger"
// import type { DocumentosService } from "./documentos.service"
// import type { CreateDocumentoDto } from "./dto/create-documento.dto"
// import type { UpdateDocumentoDto } from "./dto/update-documento.dto"
// import type { CreatePlantillaDto } from "./dto/create-plantilla.dto"
// import type { UpdatePlantillaDto } from "./dto/update-plantilla.dto"
// import type { CreateCertificadoDto } from "./dto/create-certificado.dto"
// import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
// import { RolesGuard } from "../auth/guards/roles.guard"
// import { Roles } from "../auth/decorators/roles.decorator"

// @ApiTags("documentos")
// @Controller("documentos")
// @UseGuards(JwtAuthGuard, RolesGuard)
// @ApiBearerAuth()
// export class DocumentosController {
//   constructor(private readonly documentosService: DocumentosService) {}

//   // Endpoints para documentos
//   @Post()
//   @ApiOperation({ summary: 'Crear un nuevo documento' })
//   @ApiResponse({ status: 201, description: 'Documento creado exitosamente' })
//   createDocumento(@Body() createDocumentoDto: CreateDocumentoDto) {
//     return this.documentosService.createDocumento(createDocumentoDto);
//   }

//   @Get()
//   @ApiOperation({ summary: "Obtener todos los documentos" })
//   @ApiResponse({ status: 200, description: "Lista de documentos" })
//   @ApiQuery({ name: "tipo", required: false, description: "Filtrar por tipo de documento" })
//   @ApiQuery({ name: "estado", required: false, description: "Filtrar por estado del documento" })
//   async findAllDocumentos(@Query('tipo') tipo?: string, @Query('estado') estado?: string) {
//     if (tipo) {
//       return this.documentosService.findDocumentosByTipo(tipo)
//     }

//     if (estado) {
//       return this.documentosService.findDocumentosByEstado(estado)
//     }

//     return this.documentosService.findAllDocumentos()
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Obtener un documento por ID' })
//   @ApiResponse({ status: 200, description: 'Documento encontrado' })
//   @ApiResponse({ status: 404, description: 'Documento no encontrado' })
//   findDocumentoById(@Param('id') id: string) {
//     return this.documentosService.findDocumentoById(+id);
//   }

//   @Patch(":id")
//   @ApiOperation({ summary: "Actualizar un documento" })
//   @ApiResponse({ status: 200, description: "Documento actualizado exitosamente" })
//   @ApiResponse({ status: 404, description: "Documento no encontrado" })
//   updateDocumento(@Param('id') id: string, @Body() updateDocumentoDto: UpdateDocumentoDto) {
//     return this.documentosService.updateDocumento(+id, updateDocumentoDto)
//   }

//   @Delete(':id')
//   @Roles('Administrador')
//   @ApiOperation({ summary: 'Eliminar un documento' })
//   @ApiResponse({ status: 200, description: 'Documento eliminado exitosamente' })
//   @ApiResponse({ status: 404, description: 'Documento no encontrado' })
//   removeDocumento(@Param('id') id: string) {
//     return this.documentosService.removeDocumento(+id);
//   }

//   // Endpoints para plantillas
//   @Post('plantillas')
//   @ApiOperation({ summary: 'Crear una nueva plantilla' })
//   @ApiResponse({ status: 201, description: 'Plantilla creada exitosamente' })
//   createPlantilla(@Body() createPlantillaDto: CreatePlantillaDto) {
//     return this.documentosService.createPlantilla(createPlantillaDto);
//   }

//   @Get('plantillas')
//   @ApiOperation({ summary: 'Obtener todas las plantillas' })
//   @ApiResponse({ status: 200, description: 'Lista de plantillas' })
//   @ApiQuery({ name: 'categoria', required: false, description: 'Filtrar por categoría de plantilla' })
//   async findAllPlantillas(@Query('categoria') categoria?: string) {
//     if (categoria) {
//       return this.documentosService.findPlantillasByCategoria(categoria);
//     }
    
//     return this.documentosService.findAllPlantillas();
//   }

//   @Get('plantillas/:id')
//   @ApiOperation({ summary: 'Obtener una plantilla por ID' })
//   @ApiResponse({ status: 200, description: 'Plantilla encontrada' })
//   @ApiResponse({ status: 404, description: 'Plantilla no encontrada' })
//   findPlantillaById(@Param('id') id: string) {
//     return this.documentosService.findPlantillaById(+id);
//   }

//   @Patch("plantillas/:id")
//   @ApiOperation({ summary: "Actualizar una plantilla" })
//   @ApiResponse({ status: 200, description: "Plantilla actualizada exitosamente" })
//   @ApiResponse({ status: 404, description: "Plantilla no encontrada" })
//   updatePlantilla(@Param('id') id: string, @Body() updatePlantillaDto: UpdatePlantillaDto) {
//     return this.documentosService.updatePlantilla(+id, updatePlantillaDto)
//   }

//   @Delete('plantillas/:id')
//   @Roles('Administrador')
//   @ApiOperation({ summary: 'Eliminar una plantilla' })
//   @ApiResponse({ status: 200, description: 'Plantilla eliminada exitosamente' })
//   @ApiResponse({ status: 404, description: 'Plantilla no encontrada' })
//   removePlantilla(@Param('id') id: string) {
//     return this.documentosService.removePlantilla(+id);
//   }

//   // Endpoint para generar certificado laboral
//   @Post('certificados')
//   @ApiOperation({ summary: 'Generar un certificado laboral' })
//   @ApiResponse({ status: 201, description: 'Certificado generado exitosamente' })
//   generarCertificadoLaboral(@Body() createCertificadoDto: CreateCertificadoDto) {
//     return this.documentosService.generarCertificadoLaboral(createCertificadoDto);
//   }
// }

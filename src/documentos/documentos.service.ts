// import { Injectable, NotFoundException } from "@nestjs/common"
// import { InjectRepository } from "@nestjs/typeorm"
// import type { Repository } from "typeorm"
// import { Documento } from "./entities/documento.entity"
// import { Plantilla } from "./entities/plantilla.entity"
// import type { CreateDocumentoDto } from "./dto/create-documento.dto"
// import type { UpdateDocumentoDto } from "./dto/update-documento.dto"
// import type { CreatePlantillaDto } from "./dto/create-plantilla.dto"
// import type { UpdatePlantillaDto } from "./dto/update-plantilla.dto"
// import type { ColaboradoresService } from "../colaboradores/colaboradores.service"
// import type { CreateCertificadoDto } from "./dto/create-certificado.dto"

// @Injectable()
// export class DocumentosService {
//   constructor(
//     @InjectRepository(Documento)
//     private documentosRepository: Repository<Documento>,
//     @InjectRepository(Plantilla)
//     private plantillasRepository: Repository<Plantilla>,
//     private colaboradoresService: ColaboradoresService,
//   ) {}

//   // Métodos para documentos
//   async createDocumento(createDocumentoDto: CreateDocumentoDto): Promise<Documento> {
//     const documento = this.documentosRepository.create(createDocumentoDto)
//     return this.documentosRepository.save(documento)
//   }

//   async findAllDocumentos(): Promise<Documento[]> {
//     return this.documentosRepository.find()
//   }

//   async findDocumentoById(id: number): Promise<Documento> {
//     const documento = await this.documentosRepository.findOne({
//       where: { id },
//     })

//     if (!documento) {
//       throw new NotFoundException(`Documento con ID ${id} no encontrado`)
//     }

//     return documento
//   }

//   async findDocumentosByTipo(tipo: string): Promise<Documento[]> {
//     return this.documentosRepository.find({
//       where: { tipo },
//     })
//   }

//   async findDocumentosByEstado(estado: string): Promise<Documento[]> {
//     return this.documentosRepository.find({
//       where: { estado },
//     })
//   }

//   async updateDocumento(id: number, updateDocumentoDto: UpdateDocumentoDto): Promise<Documento> {
//     const documento = await this.findDocumentoById(id)

//     await this.documentosRepository.update(id, updateDocumentoDto)
//     return this.findDocumentoById(id)
//   }

//   async removeDocumento(id: number): Promise<void> {
//     const documento = await this.findDocumentoById(id)
//     await this.documentosRepository.remove(documento)
//   }

//   // Métodos para plantillas
//   async createPlantilla(createPlantillaDto: CreatePlantillaDto): Promise<Plantilla> {
//     const plantilla = this.plantillasRepository.create(createPlantillaDto)
//     return this.plantillasRepository.save(plantilla)
//   }

//   async findAllPlantillas(): Promise<Plantilla[]> {
//     return this.plantillasRepository.find()
//   }

//   async findPlantillaById(id: number): Promise<Plantilla> {
//     const plantilla = await this.plantillasRepository.findOne({
//       where: { id },
//     })

//     if (!plantilla) {
//       throw new NotFoundException(`Plantilla con ID ${id} no encontrada`)
//     }

//     return plantilla
//   }

//   async findPlantillasByCategoria(categoria: string): Promise<Plantilla[]> {
//     return this.plantillasRepository.find({
//       where: { categoria },
//     })
//   }

//   async updatePlantilla(id: number, updatePlantillaDto: UpdatePlantillaDto): Promise<Plantilla> {
//     const plantilla = await this.findPlantillaById(id)

//     await this.plantillasRepository.update(id, updatePlantillaDto)
//     return this.findPlantillaById(id)
//   }

//   async removePlantilla(id: number): Promise<void> {
//     const plantilla = await this.findPlantillaById(id)
//     await this.plantillasRepository.remove(plantilla)
//   }

//   // Método para generar certificado laboral
//   async generarCertificadoLaboral(createCertificadoDto: CreateCertificadoDto): Promise<Documento> {
//     // Verificar si existe el colaborador
//     const colaborador = await this.colaboradoresService.findOne(createCertificadoDto.colaboradorId)

//     // Generar contenido del certificado
//     const contenido = `
//       CERTIFICADO LABORAL
      
//       Por medio de la presente, certificamos que el/la Sr./Sra. ${colaborador.nombre}, identificado(a) con cédula de ciudadanía No. ${colaborador.cedula}, labora en nuestra empresa desempeñando el cargo de ${colaborador.cargo} desde el ${createCertificadoDto.fechaInicio} hasta el ${createCertificadoDto.fechaFin}.
      
//       El/La empleado(a) tiene un salario mensual de $${createCertificadoDto.sueldo}.
      
//       Se expide la presente certificación a solicitud del interesado(a) a los ${new Date().getDate()} días del mes de ${new Date().toLocaleString("es-ES", { month: "long" })} de ${new Date().getFullYear()}.
      
//       Atentamente,
      
//       ____________________________
//       Director de Recursos Humanos
//       FacturaNext S.A.
//     `

//     // Crear documento
//     const documento = this.documentosRepository.create({
//       nombre: `Certificado Laboral - ${colaborador.nombre}`,
//       tipo: "Certificado",
//       formato: "PDF",
//       contenido,
//       estado: "Activo",
//     })

//     return this.documentosRepository.save(documento)
//   }
// }

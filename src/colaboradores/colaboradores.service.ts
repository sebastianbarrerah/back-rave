import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Colaborador } from "./entities/colaborador.entity"
import { CreateColaboradorDto } from "./dto/create-colaborador.dto"
import { UpdateColaboradorDto } from "./dto/update-colaborador.dto"

@Injectable()
export class ColaboradoresService {
  constructor(
    @InjectRepository(Colaborador)
    private colaboradoresRepository: Repository<Colaborador>,
  ) {}

  async create(createColaboradorDto: CreateColaboradorDto): Promise<Colaborador> {
    // Verificar si ya existe un colaborador con el mismo documento
    const existingColaborador = await this.colaboradoresRepository.findOne({
      where: { documento: createColaboradorDto.documento },
    })

    if (existingColaborador) {
      throw new BadRequestException("Ya existe un colaborador con este documento")
    }

    const colaborador = this.colaboradoresRepository.create(createColaboradorDto)
    return this.colaboradoresRepository.save(colaborador)
  }

  async findAll(): Promise<Colaborador[]> {
    return this.colaboradoresRepository.find()
  }

  async findOne(id: number): Promise<Colaborador> {
    const colaborador = await this.colaboradoresRepository.findOne({
      where: { id },
    })

    if (!colaborador) {
      throw new NotFoundException(`Colaborador con ID ${id} no encontrado`)
    }

    return colaborador
  }

  async findByDocumento(documento: string): Promise<Colaborador> {
    const colaborador = await this.colaboradoresRepository.findOne({
      where: { documento },
    })

    if (!colaborador) {
      throw new NotFoundException(`Colaborador con documento ${documento} no encontrado`)
    }

    return colaborador
  }

  async update(id: number, updateColaboradorDto: UpdateColaboradorDto): Promise<Colaborador> {
    const colaborador = await this.findOne(id)

    // Si se está actualizando el documento, verificar que no exista
    if (updateColaboradorDto.documento && updateColaboradorDto.documento !== colaborador.documento) {
      const existingColaborador = await this.colaboradoresRepository.findOne({
        where: { documento: updateColaboradorDto.documento },
      })

      if (existingColaborador) {
        throw new BadRequestException("Ya existe un colaborador con este documento")
      }
    }

    await this.colaboradoresRepository.update(id, updateColaboradorDto)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    const colaborador = await this.findOne(id)
    await this.colaboradoresRepository.remove(colaborador)
  }
}

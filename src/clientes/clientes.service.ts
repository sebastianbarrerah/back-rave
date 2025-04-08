import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Cliente } from "./entities/cliente.entity"
import { CreateClienteDto } from "./dto/create-cliente.dto"
import { UpdateClienteDto } from "./dto/update-cliente.dto"

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    // Verificar si ya existe un cliente con el mismo documento
    const existingCliente = await this.clientesRepository.findOne({
      where: { documento: createClienteDto.documento },
    })

    if (existingCliente) {
      throw new BadRequestException("Ya existe un cliente con este documento")
    }

    const cliente = this.clientesRepository.create(createClienteDto)
    return this.clientesRepository.save(cliente)
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find()
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOne({
      where: { id },
    })

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`)
    }

    return cliente
  }

  async findByDocumento(documento: string): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOne({
      where: { documento },
    })

    if (!cliente) {
      throw new NotFoundException(`Cliente con documento ${documento} no encontrado`)
    }

    return cliente
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id)

    // Si se está actualizando el documento, verificar que no exista
    if (updateClienteDto.documento && updateClienteDto.documento !== cliente.documento) {
      const existingCliente = await this.clientesRepository.findOne({
        where: { documento: updateClienteDto.documento },
      })

      if (existingCliente) {
        throw new BadRequestException("Ya existe un cliente con este documento")
      }
    }

    await this.clientesRepository.update(id, updateClienteDto)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id)
    await this.clientesRepository.remove(cliente)
  }
}

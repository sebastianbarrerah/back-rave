import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Role } from "./entities/role.entity"
import { CreateRoleDto } from "./dto/create-role.dto"
import { UpdateRoleDto } from "./dto/update-role.dto"
import { Permiso } from "../permisos/entities/permiso.entity"

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permiso)
    private permisosRepository: Repository<Permiso>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Si hay permisos, buscarlos en la base de datos
    let permisos = []
    if (createRoleDto.permisos && createRoleDto.permisos.length > 0) {
      permisos = await this.permisosRepository.findByIds(createRoleDto.permisos)
    }

    const role = this.rolesRepository.create({
      ...createRoleDto,
      permisos,
    })

    return this.rolesRepository.save(role)
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find({
      relations: ["permisos"],
    })
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: ["permisos"],
    })

    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`) 
    }

    return role
  }

  async findByName(nombre: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { nombre },
      relations: ["permisos"],
    })

    if (!role) {
      throw new NotFoundException(`Rol con nombre ${nombre} no encontrado`)
    }

    return role
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id)

    // Si hay permisos, buscarlos en la base de datos
    if (updateRoleDto.permisos) {
      const permisos = await this.permisosRepository.findByIds(updateRoleDto.permisos)
      role.permisos = permisos
    }

    // Actualizar los demás campos
    Object.assign(role, updateRoleDto)

    return this.rolesRepository.save(role)
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id)
    await this.rolesRepository.remove(role)
  }
}

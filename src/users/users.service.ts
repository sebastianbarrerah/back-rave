import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email)
    if (existingUser) {
      throw new BadRequestException("El email ya está registrado")
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })

    console.log(user)
    return this.usersRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    console.log("Find all")
    return this.usersRepository.find({
      relations: ["roles"],
      select: ["id", "name", "email", "isActive", "createdAt", "updatedAt"],
    })
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ["id", "name", "email", "isActive", "createdAt", "updatedAt"],
    })

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`)
    }

    return user
  }

  async findOneWithRoles(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ["roles"],
      select: ["id", "name", "email", "isActive", "createdAt", "updatedAt"],
    })

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`)
    }

    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ["roles"],
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)

    // Si se está actualizando el email, verificar que no exista
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email)
      if (existingUser) {
        throw new BadRequestException("El email ya está registrado")
      }
    }

    // Si se está actualizando la contraseña, encriptarla
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    await this.usersRepository.update(id, updateUserDto)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id)
    await this.usersRepository.remove(user)
  }
}

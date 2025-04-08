import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common"
// import type { JwtService } from "@nestjs/jwt"
// import type { UsersService } from "../users/users.service"
import { LoginDto } from "./dto/login.dto"
import { RegisterDto } from "./dto/register.dto"
import * as bcrypt from "bcrypt"
// import type { RolesService } from "../roles/roles.service"
import { UsersService } from "../users/users.service"
import { JwtService } from "@nestjs/jwt"
import { RolesService } from "../roles/roles.service"


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    if (!user) {
      throw new UnauthorizedException("Credenciales inválidas")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciales inválidas")
    }

    const { password: _, ...result } = user
    return result
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)

    // Obtener los roles y permisos del usuario
    const userWithRoles = await this.usersService.findOneWithRoles(user.id)

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      roles: userWithRoles.roles.map((role) => role.nombre),
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: userWithRoles.roles,
      },
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(registerDto: RegisterDto) {
    // Verificar si el email ya existe
    const existingUser = await this.usersService.findByEmail(registerDto.email)
    if (existingUser) {
      throw new BadRequestException("El email ya está registrado")
    }

    // Obtener el rol por defecto (vendedor o el que corresponda)
    const defaultRole = await this.rolesService.findByName("Administrador")
    if (!defaultRole) {
      throw new BadRequestException("No se pudo asignar un rol por defecto")
    }

    // Crear el usuario
    const user = await this.usersService.create({
      ...registerDto,
      roles: [defaultRole],
    })

    // Generar token
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      roles: [defaultRole.nombre],
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: [defaultRole],
      },
      access_token: this.jwtService.sign(payload),
    }
  }

  async refreshToken(userId: number) {
    const user = await this.usersService.findOne(userId)
    if (!user) {
      throw new UnauthorizedException("Usuario no encontrado")
    }

    // Obtener los roles y permisos del usuario
    const userWithRoles = await this.usersService.findOneWithRoles(user.id)

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      roles: userWithRoles.roles.map((role) => role.nombre),
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}

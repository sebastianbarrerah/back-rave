import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto, LoginDto } from "./dtos";
import { JwtService } from "@nestjs/jwt";
import { Ipayload } from "./interfaces/Ipayload.interface";

@Injectable()

export class AuthService {
    
    private readonly logger = new Logger();
    constructor(
        @InjectRepository(User)
        private readonly userRepositoy: Repository<User>,
        private jwtService: JwtService,
    ) { }

    private generateJwt(payload:Ipayload){
        const token = this.jwtService.sign(payload)
        return token
    }

    async createUser(createUserDto: CreateUserDto) {
        const { email, password, fullName, ...data } = createUserDto;

        const verifyEmail = await this.userRepositoy.findOneBy({ email });
        if (verifyEmail) {
            throw new BadRequestException(`El email ${email} ya se encuentra inscrito`);
        }

        try {
            const pass = bcrypt.hashSync(password, 10)
            const newUser = this.userRepositoy.create({
                fullName: createUserDto.fullName,
                email: createUserDto.email,
                password: pass
            });
            await this.userRepositoy.save(newUser);
            return {
                ...newUser,
                token: this.generateJwt({fullName, email })
            }

        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException('No se pudo crear el usuario');
        }
    }

    async login(userDto: LoginDto) {
        const { password, email} = userDto;

        try {
            const user = await this.userRepositoy.findOne({
                where: { email },
                select: { email: true, password: true, fullName: true }
            })

            if (!user) {
                throw new UnauthorizedException(`El email ${email} No tiene autorización`)
            }

            const pass = bcrypt.compareSync(password, user.password);

            if (!pass) {
                throw new UnauthorizedException('La contraseña es incorrecta')
            }

            return {
                ...user,
                token: this.generateJwt({fullName: user.fullName, email} )
            }

        } catch (error) {
            this.logger.error(error);
            throw new UnauthorizedException(error.message)
        }
    }
}
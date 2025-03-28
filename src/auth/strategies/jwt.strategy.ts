import { PassportStrategy } from "@nestjs/passport";
import { User } from "../entities/users.entity";
import { Ipayload } from "../interfaces/Ipayload.interface";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  
    constructor(
      @InjectRepository(User)
      private readonly userRepositoy: Repository<User>,
    ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'MySE3cRETjWT',
        });
      }

    async validate(payload: Ipayload ):Promise<User>{

        const {email} = payload;

        const user = await this.userRepositoy.findOne({where:{email}})

        if(!user){
          throw new UnauthorizedException('Token no valido');
        }
        
        if(!user.isActive){
          throw new UnauthorizedException('Usuario no autorizado');
        }

      return user;
        
    }
}


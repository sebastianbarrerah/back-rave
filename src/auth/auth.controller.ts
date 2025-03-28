import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"; 
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginDto } from "./dtos/login.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./decorators/get-user.decorator";
import { User } from "./entities/users.entity";
import { Roles } from "./interfaces/rolesEnum.enum";
import { Auth } from "./decorators/auth.decorator";

@Controller('/auth')
export class AuthController{
    
    constructor(private authService: AuthService){}

    @Post('/register') 
    async register(@Body() createUser: CreateUserDto) {
        return await this.authService.createUser(createUser);
    }
    
    @Post('/login')
    async login(@Body() loginDto: LoginDto ){
        return await this.authService.login(loginDto);
    }

    @Get('/private')
    @Auth(Roles.admin)
    routePrivate(@GetUser() user:User){
        return {
            user,
            ok: true
        }
    }

};

    
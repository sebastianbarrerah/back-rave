import { Type } from "class-transformer";  
import { IsBoolean, IsDate, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateCustomerDto {

    @IsString()
    fullName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsNumber()
    phone: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAt?: Date;

    // Aqui se debe poner lo de las ventas el array
}
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    fullName: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    lot: number;

    @IsString()
    @IsOptional()
    imageProduct: string;

    @IsString()
    @IsOptional()
    category: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;



    // y tambien relacion con ventas para generar la factura

    // aqui iria la relación con inventario
}

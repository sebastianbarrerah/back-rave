import { IsInt, IsPositive, IsString } from "class-validator";


export class CreateInventoryDto {
    
    @IsString()
    id: string;

    @IsString()
    productId: string;

    @IsInt()
    stock: number
}

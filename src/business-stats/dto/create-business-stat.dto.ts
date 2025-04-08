import { IsNumber, IsPositive } from "class-validator";

export class CreateBusinessStatDto {

    @IsPositive()
    @IsNumber()
    totalGlobal: number; 
}

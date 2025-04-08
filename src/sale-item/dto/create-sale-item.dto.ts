import { IsInt, IsUUID } from "class-validator";

export class CreateSaleItemDto {
    @IsUUID()
    productId: string;
  
    @IsInt()
    quantity: number;
  }
import { IsUUID, IsInt } from "class-validator";

export class InvoiceItemDto {
    @IsUUID()
    productId: string;
  
    @IsInt()
    quantity: number;
  }
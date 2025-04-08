import { IsUUID, IsArray, IsString, IsIn } from "class-validator";
import { CreateSaleItemDto } from "src/sale-item/dto/create-sale-item.dto";

export class CreateSaleDto {
    @IsUUID()
    customerId: string;
  
    @IsArray()
    items: CreateSaleItemDto[];
  
    @IsString()
    colaborator: string;
  
    @IsIn(['contado', 'credito'])
    paymentType: string;
  }

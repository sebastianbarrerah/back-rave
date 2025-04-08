import { IsUUID, IsArray } from "class-validator";
import { InvoiceItemDto } from "src/invoice-item/dto/create-invoice-item.dto";

export class CreateInvoiceDto {
    @IsUUID()
    customerId: string;
  
    @IsArray()
    items: InvoiceItemDto[];
  }
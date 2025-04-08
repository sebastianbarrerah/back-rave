import { PartialType } from '@nestjs/mapped-types';
import { InvoiceItemDto } from './create-invoice-item.dto';


export class UpdateInvoiceItemDto extends PartialType(InvoiceItemDto) {}

import { Injectable } from '@nestjs/common';

import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { InvoiceItemDto } from './dto/create-invoice-item.dto';

@Injectable()
export class InvoiceItemService {
  create(createInvoiceItemDto: InvoiceItemDto) {
    return 'This action adds a new invoiceItem';
  }

  findAll() {
    return `This action returns all invoiceItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceItem`;
  }

  update(id: number, updateInvoiceItemDto: UpdateInvoiceItemDto) {
    return `This action updates a #${id} invoiceItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceItem`;
  }
}

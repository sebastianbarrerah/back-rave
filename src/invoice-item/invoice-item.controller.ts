import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { InvoiceItemDto } from './dto/create-invoice-item.dto';

@Controller('invoice-item')
export class InvoiceItemController {
  constructor(private readonly invoiceItemService: InvoiceItemService) {}

  @Post()
  create(@Body() createInvoiceItemDto: InvoiceItemDto) {
    return this.invoiceItemService.create(createInvoiceItemDto);
  }

  @Get()
  findAll() {
    return this.invoiceItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceItemDto: UpdateInvoiceItemDto) {
    return this.invoiceItemService.update(+id, updateInvoiceItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceItemService.remove(+id);
  }
}

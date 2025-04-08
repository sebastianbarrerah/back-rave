import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleItemService } from './sale-item.service';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';
import { UpdateSaleItemDto } from './dto/update-sale-item.dto';

@Controller('sale-item')
export class SaleItemController {
  constructor(private readonly saleItemService: SaleItemService) {}

}

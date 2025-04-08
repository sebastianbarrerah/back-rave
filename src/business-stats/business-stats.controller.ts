import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessStatsService } from './business-stats.service';
import { CreateBusinessStatDto } from './dto/create-business-stat.dto';
import { UpdateBusinessStatDto } from './dto/update-business-stat.dto';

@Controller('/stats')
export class BusinessStatsController {
  constructor(private readonly statService: BusinessStatsService) {}

  @Get()
  getStats() {
    return this.statService.getStats();
  }
}

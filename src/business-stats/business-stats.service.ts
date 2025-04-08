import { Injectable } from '@nestjs/common';
import { CreateBusinessStatDto } from './dto/create-business-stat.dto';
import { UpdateBusinessStatDto } from './dto/update-business-stat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessStat } from './entities/business-stat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessStatsService {
  constructor(
    @InjectRepository(BusinessStat) private statRepo: Repository<BusinessStat>,
  ) {}

  async getStats() {
    return this.statRepo.find();
  }
}

 


 
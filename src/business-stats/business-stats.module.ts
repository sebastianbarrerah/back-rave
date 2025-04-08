import { Module } from '@nestjs/common';
import { BusinessStatsService } from './business-stats.service';
import { BusinessStatsController } from './business-stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessStat } from './entities/business-stat.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BusinessStat])],
  controllers: [BusinessStatsController],
  providers: [BusinessStatsService],
})
export class BusinessStatsModule {}

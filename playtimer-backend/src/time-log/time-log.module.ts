import { Module } from '@nestjs/common';
import { TimeLogService } from './time-log.service';
import { TimeLogController } from './time-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeLogEntity } from './models/time-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeLogEntity])],
  providers: [TimeLogService],
  controllers: [TimeLogController],
})
export class TimeLogModule {}

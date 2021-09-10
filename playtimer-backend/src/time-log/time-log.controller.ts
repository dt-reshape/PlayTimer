import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TimeLogService } from './time-log.service';
import { TimeLogDto } from './models/dtos/time-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('time-log')
export class TimeLogController {
  constructor(private readonly timeLogService: TimeLogService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/report/:id')
  async getReport(
    @Param('id', ParseIntPipe) id: number,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ) {
    return this.timeLogService.getReport(id, fromDate, toDate);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/statistics/:id')
  async getStatistics(@Param('id', ParseIntPipe) id: number) {
    return this.timeLogService.getStatistics(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async logTime(@Body() timeLogDto: TimeLogDto) {
    return this.timeLogService.logTime(timeLogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/history/:id')
  async getLogHistory(@Param('id', ParseIntPipe) id: number) {
    return this.timeLogService.getLogHistory(id);
  }
}

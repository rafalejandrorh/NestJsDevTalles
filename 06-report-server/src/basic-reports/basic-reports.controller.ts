import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { CreateBasicReportDto } from './dto/create-basic-report.dto';
import { UpdateBasicReportDto } from './dto/update-basic-report.dto';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Post()
  create(@Body() createBasicReportDto: CreateBasicReportDto) {
    return this.basicReportsService.create(createBasicReportDto);
  }

  @Get()
  findAll() {
    return this.basicReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basicReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasicReportDto: UpdateBasicReportDto) {
    return this.basicReportsService.update(+id, updateBasicReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basicReportsService.remove(+id);
  }
}

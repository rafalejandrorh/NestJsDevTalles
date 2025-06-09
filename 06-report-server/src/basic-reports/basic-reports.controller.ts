import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get('hello-world')
  helloWorld(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.helloWorld();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello World Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basicReportsService.findOne(+id);
  }

}

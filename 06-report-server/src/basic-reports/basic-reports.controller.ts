import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
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

  @Get('employment-letter')
  employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterById(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Res() response: Response
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(employeeId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async countriesList(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.countriesList();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}

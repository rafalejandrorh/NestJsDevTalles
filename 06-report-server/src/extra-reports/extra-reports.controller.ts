import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html')
  async getHtmlReport(@Res() response: Response) {
    const pdfDoc = await this.extraReportsService.getHtmlReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Html-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('personalized')
  getPersonalizedReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getPersonalizedReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Personalized-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}

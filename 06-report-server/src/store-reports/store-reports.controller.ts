import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}
  
  @Get('order/:orderId')
  async getOrderReportById(@Param('orderId', ParseIntPipe) orderId: number, @Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getOrderReportById(orderId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}

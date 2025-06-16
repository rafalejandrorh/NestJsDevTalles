import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {

  constructor(
    private readonly printer: PrinterService
  ) {}

  getHtmlReport() {
    const html = fs.readFileSync('./src/reports/html/basic-01.html', 'utf-8');
    
    return this.printer.createPdf(getHelloWorldReport({
      name: 'Rafael'
    }));
  }

}

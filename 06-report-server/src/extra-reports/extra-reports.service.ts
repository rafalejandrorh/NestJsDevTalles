import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHtmlContent } from 'src/helpers/html-to-pdf';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { getPersonalizedReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {

  constructor(
    private readonly printer: PrinterService
  ) {}

  getHtmlReport() {
    //const html = fs.readFileSync('./src/reports/html/basic-01.html', 'utf-8');
    // const html = fs.readFileSync('./src/reports/html/basic-02.html', 'utf-8');
    const html = fs.readFileSync('./src/reports/html/basic-03.html', 'utf-8');
    const content = getHtmlContent(html, {
      client: 'Rafael Rivero',
      title: 'Curso de NestJS'
    });
    
    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HTML to PDFMake',
        subtitle: 'Convertir HTML a PDFMake'
      }),
      content: content
    }

    return this.printer.createPdf(docDefinition);
  }

  getPersonalizedReport() {
    return this.printer.createPdf(getPersonalizedReport()); 
  }

}

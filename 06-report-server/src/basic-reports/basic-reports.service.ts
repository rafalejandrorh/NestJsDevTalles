import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  helloWorld() {
    const printer = new PdfPrinter(fonts);
    const docDefinition: TDocumentDefinitions = {
      content: [
        'Hola Mundo'
      ]
    }
    return printer.createPdfKitDocument(docDefinition)
  }

  findOne(id: number) {
    return `This action returns a #${id} basicReport`;
  }

}

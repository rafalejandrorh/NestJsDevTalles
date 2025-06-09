import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {

  constructor(
    private readonly printer: PrinterService
  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  helloWorld() {
    return this.printer.createPdf(getHelloWorldReport({
      name: 'Rafael'
    }));
  }

  employmentLetter() {
    return this.printer.createPdf(getEmploymentLetterReport());
  }

}

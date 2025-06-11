import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterByIdReport, getEmploymentLetterReport, getHelloWorldReport, getCountriesListReport } from 'src/reports';

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

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: { id: employeeId },
      select: {
        name: true,
        position: true,
        start_date: true,
        work_time: true,
        hours_per_day: true,
        work_schedule: true,
      }
    })
    if(!employee) throw new NotFoundException(`Employee with ID ${employeeId} not found`);

    return this.printer.createPdf(getEmploymentLetterByIdReport({
      employerName: 'Rafael Rivero',
      employerPosition: 'Gerente de RRHH',
      employerCompany: 'Tucan Code Corp.',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule
    }));
  }

  async countriesList() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null
        },
        continent: {
          not: null
        }
      }
    });

    return this.printer.createPdf(getCountriesListReport({
      title: 'Countries Report',
      subTitle: 'List of Countries',
      countries: countries
    }));
  }

}

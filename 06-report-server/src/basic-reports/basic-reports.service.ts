import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateBasicReportDto } from './dto/create-basic-report.dto';
import { UpdateBasicReportDto } from './dto/update-basic-report.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  create(createBasicReportDto: CreateBasicReportDto) {
    return 'This action adds a new basicReport';
  }

  findAll() {
    return this.employees.findFirst();
  }

  findOne(id: number) {
    return `This action returns a #${id} basicReport`;
  }

  update(id: number, updateBasicReportDto: UpdateBasicReportDto) {
    return `This action updates a #${id} basicReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} basicReport`;
  }
}

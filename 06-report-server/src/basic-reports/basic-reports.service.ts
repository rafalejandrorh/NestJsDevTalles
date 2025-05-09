import { Injectable } from '@nestjs/common';
import { CreateBasicReportDto } from './dto/create-basic-report.dto';
import { UpdateBasicReportDto } from './dto/update-basic-report.dto';

@Injectable()
export class BasicReportsService {
  create(createBasicReportDto: CreateBasicReportDto) {
    return 'This action adds a new basicReport';
  }

  findAll() {
    return `This action returns all basicReports`;
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

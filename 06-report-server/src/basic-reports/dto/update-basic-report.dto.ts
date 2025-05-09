import { PartialType } from '@nestjs/mapped-types';
import { CreateBasicReportDto } from './create-basic-report.dto';

export class UpdateBasicReportDto extends PartialType(CreateBasicReportDto) {}

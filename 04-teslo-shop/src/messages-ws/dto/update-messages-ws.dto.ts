import { PartialType } from '@nestjs/mapped-types';
import { CreateMessagesWsDto } from './create-messages-ws.dto';

export class UpdateMessagesWsDto extends PartialType(CreateMessagesWsDto) {
  id: number;
}

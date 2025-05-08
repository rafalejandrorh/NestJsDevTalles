import { Socket } from 'socket.io';
import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { CreateMessagesWDto } from './dto/create-messages-w.dto';
import { UpdateMessagesWDto } from './dto/update-messages-w.dto';
import { MessagesWsService } from './messages-ws.service';
import { connected } from 'process';

@WebSocketGateway({ cors: true, namespace: '/messages-ws' })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    this.messagesWsService.registerClient(client);
    console.log({ connectedClients: this.messagesWsService.getConnectedClients()});
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    this.messagesWsService.removeClient(client.id);
    console.log({ connectedClients: this.messagesWsService.getConnectedClients()});
  }

  @SubscribeMessage('createMessagesWs')
  create(@MessageBody() createMessagesWDto: CreateMessagesWDto) {
    return this.messagesWsService.create(createMessagesWDto);
  }

  @SubscribeMessage('findAllMessagesWs')
  findAll() {
    return this.messagesWsService.findAll();
  }

  @SubscribeMessage('findOneMessagesWs')
  findOne(@MessageBody() id: number) {
    return this.messagesWsService.findOne(id);
  }

  @SubscribeMessage('updateMessagesWs')
  update(@MessageBody() updateMessagesWDto: UpdateMessagesWDto) {
    return this.messagesWsService.update(updateMessagesWDto.id, updateMessagesWDto);
  }

  @SubscribeMessage('removeMessagesW')
  remove(@MessageBody() id: number) {
    return this.messagesWsService.remove(id);
  }
}

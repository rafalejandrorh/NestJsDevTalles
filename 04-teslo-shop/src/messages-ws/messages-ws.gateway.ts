import { Socket } from 'socket.io';
import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { CreateMessagesWsDto } from './dto/create-messages-ws.dto';
import { UpdateMessagesWsDto } from './dto/update-messages-ws.dto';
import { MessagesWsService } from './messages-ws.service';
import { Server } from 'http';

@WebSocketGateway({ cors: true, namespace: '/messages-ws' })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    this.messagesWsService.registerClient(client);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    this.messagesWsService.removeClient(client.id);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: CreateMessagesWsDto) {
    return this.messagesWsService.create(payload);
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
  update(@MessageBody() updateMessagesWDto: UpdateMessagesWsDto) {
    return this.messagesWsService.update(updateMessagesWDto.id, updateMessagesWDto);
  }

  @SubscribeMessage('removeMessagesW')
  remove(@MessageBody() id: number) {
    return this.messagesWsService.remove(id);
  }
}

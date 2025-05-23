import { Socket } from 'socket.io';
import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { CreateMessagesWsDto } from './dto/create-messages-ws.dto';
import { UpdateMessagesWsDto } from './dto/update-messages-ws.dto';
import { MessagesWsService } from './messages-ws.service';
import { Server } from 'http';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true, namespace: '/messages-ws' })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) {}

  handleConnection(client: Socket) {

    const token = client.handshake.headers.authorization as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      this.messagesWsService.registerClient(client, payload.id);  
    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    this.messagesWsService.removeClient(client.id);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: CreateMessagesWsDto) {

    // Emit Only Client that send message
    // client.emit('message-from-server', {
    //   fullName: 'Talles',
    //   message: payload.message || 'no message'
    // });

    // Emit Everyone except Client that send message
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Talles',
    //   message: payload.message || 'no message'
    // });

    // Emit Everyone, include Client that send message
    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'no message'
    });
  }

}

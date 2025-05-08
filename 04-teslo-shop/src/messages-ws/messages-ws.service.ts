import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { CreateMessagesWsDto } from './dto/create-messages-ws.dto';
import { UpdateMessagesWsDto } from './dto/update-messages-ws.dto';

interface ConnectedClients {
  [id: string]: Socket;

}

@Injectable()
export class MessagesWsService {

  private connectedClients: ConnectedClients = {};

  registerClient(client: Socket) {
    this.connectedClients[client.id] = client;
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }

  create(createMessagesWDto: CreateMessagesWsDto) {
    return 'This action adds a new messagesW';
  }

  findAll() {
    return `This action returns all messagesWs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messagesW`;
  }

  update(id: number, updateMessagesWDto: UpdateMessagesWsDto) {
    return `This action updates a #${id} messagesW`;
  }

  remove(id: number) {
    return `This action removes a #${id} messagesW`;
  }
}

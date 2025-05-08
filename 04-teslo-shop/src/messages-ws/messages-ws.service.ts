import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { CreateMessagesWsDto } from './dto/create-messages-ws.dto';
import { UpdateMessagesWsDto } from './dto/update-messages-ws.dto';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

interface ConnectedClients {
  [id: string]: {
    socket: Socket, 
    user: User
  };

}

@Injectable()
export class MessagesWsService {

  private connectedClients: ConnectedClients = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async registerClient(client: Socket, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if(!user) throw new Error('User not found');
    if(!user.isActive) throw new Error('User not active');
    this.connectedClients[client.id] = {
      socket: client,
      user: user
    };
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    console.log(this.connectedClients);
    return Object.keys(this.connectedClients);
  }

  getUserFullName(socketId: string) {
    return this.connectedClients[socketId].user.fullName;
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

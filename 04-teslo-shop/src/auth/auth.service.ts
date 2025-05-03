import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Assuming you have a User entity and repository set up
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    try {

      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;

    } catch (error) {
      this.handleException(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  private handleException(error: any): never {
    if(error.code === '23505') {
      this.logger.warn('User already exists', error.detail);
      throw new BadRequestException('User already exists');
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Internal Server Exception');
  }

}

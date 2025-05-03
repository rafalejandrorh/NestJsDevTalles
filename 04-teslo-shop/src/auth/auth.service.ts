import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Assuming you have a User entity and repository set up
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userDetails } = createUserDto;
      const user = this.userRepository.create({
        ...userDetails,
        password: bcrypt.hashSync(password, 10), // Hash the password before saving
      });
      await this.userRepository.save(user);

      delete (user as any).password; // Remove password from the response for security reasons
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

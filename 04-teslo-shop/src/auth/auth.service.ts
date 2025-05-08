import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService
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

  async login(loginUserDto: LoginUserDto) {

    try {

      const { password, email } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
        select: { id:true, email:true, password: true}
      });

      if (!user) throw new UnauthorizedException('Credentials are not valid (email)');
      if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid (password)');
      
      delete (user as any).password; // Remove password from the response for security reasons
      return {
        ...user,
        token: this.getJwtToken({ 
          id: user.id,
          iat: Math.floor(Date.now() / 1000), // Current time in seconds since epoch
        })
      };

    } catch (error) {
      this.handleException(error);
    }

  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
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

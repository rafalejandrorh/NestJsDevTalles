import { IncomingHttpHeaders } from 'http';
import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { GetUser, RawHeaders, Auth, RoleProtected } from './decorators/';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from './guards/user-role.guard';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User was registered', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Login successfull', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  @ApiResponse({ status: 200, description: 'Login successfull', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    //@Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders
  ) {



    return {
      ok: true,
      message: 'Hello world!',
      user,
      userEmail,
      rawHeaders,
      headers
    };
  }

  @Get('private2')
  //@SetMetadata('roles', [ 'admin', 'super-user' ])
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }

  }

  @Get('private3')
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'Login successfull', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  privateRoute3(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }

  }

}

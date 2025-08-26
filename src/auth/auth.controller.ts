import { Controller, Post, Body, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareTheHashes } from 'src/utils/bcrypt';
import { Throttle } from '@nestjs/throttler';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation } from '@nestjs/swagger';
import { login } from './dto/login.dto';


@Controller('login')
export class authController {
  constructor(private userService: UsersService) {}

  @ApiOperation({summary : 'login based on user name and password'})
  @ApiCreatedResponse({description : 'user logedin'})
  @ApiForbiddenResponse({description : ' user did not found'})
  @ApiBadRequestResponse({ description : 'the password does not match the username'})
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Post('')
  async login(@Body() loignDTO : login) {
    const user = await this.userService.findByUsername(loignDTO.username);
    if (!user) throw new HttpException('user did not found',HttpStatus.FORBIDDEN)

    const valid = await compareTheHashes(loignDTO.password,user.password)
    if (!valid) throw new HttpException('the password does not match the username',HttpStatus.BAD_REQUEST)

    // Authentication موفق بود، می‌تونی اطلاعات کاربر رو برگردونی
    return {
      message: 'successful login',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}

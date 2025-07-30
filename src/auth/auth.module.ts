import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { loginLoggerMiddleware } from 'src/middlewares/logger/logger.middleware';

@Module({
  imports:[UsersModule],
  controllers: [authController],
  providers: [AuthService ],
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loginLoggerMiddleware).forRoutes({
      path:'login',
      method:RequestMethod.POST
    })
  }
}

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserLoggerMiddleware, DeleteUserLoggerMiddleware, FetchAllUsersLoggerMiddleware, GetUserByIDLoggerMiddleware, UpdateUserLoggerMiddleware } from 'src/middlewares/logger/logger.middleware';
import { profile } from 'console';

@Module({
  imports:[TypeOrmModule.forFeature([User , profile])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[TypeOrmModule , UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateUserLoggerMiddleware).forRoutes({
      path : 'users',
      method : RequestMethod.POST
    }),
      consumer.apply(UpdateUserLoggerMiddleware).forRoutes({
      path : 'users/:id',
      method : RequestMethod.PATCH
    }),
        consumer.apply(GetUserByIDLoggerMiddleware).forRoutes({
      path : 'users/:id',
      method : RequestMethod.GET
    }),
        consumer.apply(FetchAllUsersLoggerMiddleware).forRoutes({
      path : 'users',
      method : RequestMethod.GET
    }),
        consumer.apply(DeleteUserLoggerMiddleware).forRoutes({
      path : 'users/:id',
      method : RequestMethod.DELETE
    })
  }
}

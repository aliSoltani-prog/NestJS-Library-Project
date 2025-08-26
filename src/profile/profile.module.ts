import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { profile } from 'console';
import { Profile } from './entities/profile.entity';
import { CreateProfileLoggerMiddleware, EditProfileLoggerMiddleware } from 'src/middlewares/logger/logger.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([User , Profile])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EditProfileLoggerMiddleware).forRoutes({
      path : 'users/:id/profile/:id',
      method:RequestMethod.PATCH
    }),
      consumer.apply(CreateProfileLoggerMiddleware).forRoutes({
      path : 'users/:id/profile',
      method:RequestMethod.PATCH
    })
  }
}

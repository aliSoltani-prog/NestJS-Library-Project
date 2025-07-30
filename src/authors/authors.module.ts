import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { BooksModule } from 'src/books/books.module';
import { SendAnAuthorLoggerMiddleware } from 'src/middlewares/logger/logger.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([Author]), 
  BooksModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SendAnAuthorLoggerMiddleware).forRoutes({
      path:'books/:id/authors',
      method:RequestMethod.POST
    })
  }
}

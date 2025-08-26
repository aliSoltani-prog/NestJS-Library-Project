import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { BooksModule } from 'src/books/books.module';
import { AssignAuthorToBookLoggerMiddleware, CreateAnAuthorLoggerMiddleware, DeleteAuthorLoggerMiddleware, EditAnAuthorLoggerMiddleware, FetchAllAuthorsLoggerMiddleware, SearchForOneAuthorByIDLoggerMiddleware, SearchForOneAuthorByNameLoggerMiddleware} from 'src/middlewares/logger/logger.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([Author]), 
  BooksModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EditAnAuthorLoggerMiddleware).forRoutes({
      path : 'authors/:id',
      method:RequestMethod.PATCH
    }),
      consumer.apply(DeleteAuthorLoggerMiddleware).forRoutes({
      path : 'authors/:id',
      method:RequestMethod.DELETE
    }),
      consumer.apply(CreateAnAuthorLoggerMiddleware).forRoutes({
      path : 'authors',
      method:RequestMethod.POST
    }),
      consumer.apply(FetchAllAuthorsLoggerMiddleware).forRoutes({
      path : 'authors',
      method:RequestMethod.GET
    }),
      consumer.apply(SearchForOneAuthorByIDLoggerMiddleware).forRoutes({
      path : 'authors/:id',
      method:RequestMethod.GET
    }),
      consumer.apply(SearchForOneAuthorByNameLoggerMiddleware).forRoutes({
      path : 'authors/name/:name',
      method:RequestMethod.GET
    }),
      consumer.apply(AssignAuthorToBookLoggerMiddleware).forRoutes({
      path : 'books/:id/author',
      method:RequestMethod.PATCH
    })
  }
}

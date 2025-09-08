import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { CreateBookLoggerMiddleware, DeleteBookLoggerMiddleware, FetchAllBooksLoggerMiddleware, GetBookByIDLoggerMiddleware, searchForaBookLoggerMiddleware, UpdateBookLoggerMiddleware } from 'src/middlewares/logger/logger.middleware';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { Author } from 'src/authors/entities/author.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Book , Author]) , ThrottlerModule.forRoot({
    throttlers:[{
      ttl : 5000 , 
      limit : 2
    }]
  })] ,
  controllers: [BooksController],
  providers: [BooksService],
  exports:[TypeOrmModule]
})
export class BooksModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {

    consumer.apply(CreateBookLoggerMiddleware).forRoutes({
      path : 'books',
      method:RequestMethod.POST
    }),

    consumer.apply(UpdateBookLoggerMiddleware).forRoutes({
      path : 'books/:id',
      method:RequestMethod.PATCH
    }),

    consumer.apply(DeleteBookLoggerMiddleware).forRoutes({
      path : 'books/:id',
      method:RequestMethod.DELETE
    }),

    consumer.apply(GetBookByIDLoggerMiddleware).forRoutes({
      path : 'books/:id',
      method:RequestMethod.GET
    }),

    consumer.apply(FetchAllBooksLoggerMiddleware).forRoutes({
      path : 'books',
      method:RequestMethod.GET
    }),     
    
      consumer.apply(searchForaBookLoggerMiddleware).forRoutes({
      path : 'books/title/:title',
      method:RequestMethod.GET
    })

  }
}

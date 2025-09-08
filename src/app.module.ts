import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/entities/author.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';




@Module({
  imports: [BooksModule , TypeOrmModule.forRoot({
    type:'mysql',
    port:3306,
    host:'localhost',
    username:'aliSoltani',
    password:'mysql',
    database:'librarydb',
    entities:[Book , Author , User , Profile],  
    synchronize:true
  }), AuthorsModule , UsersModule, AuthModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService , {provide : APP_GUARD
    , useClass : ThrottlerGuard
  }],
})
export class AppModule {}

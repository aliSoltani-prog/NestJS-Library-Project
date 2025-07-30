import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { Book } from 'src/books/entities/book.entity';
import { createAuthorBackup } from 'src/type/params';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Book)
    private bookrepo: Repository<Book>,

    @InjectRepository(Author)
    private authorrepo: Repository<Author>,
  ) {}

  async create(bookId: number, createAuthorBackup: createAuthorBackup) {
    const book = await this.bookrepo.findOneBy({ id: bookId });

    if (!book) {
      throw new HttpException('Book Does Not Found', HttpStatus.FORBIDDEN);
    }

    const newAuthor = this.authorrepo.create({
 ...createAuthorBackup, books: [book],
   // ✅ تبدیل به آرایه چون @OneToMany هست
    });

    return await this.authorrepo.save(newAuthor); // ✅ ذخیره نهایی در دیتابیس
  }
}

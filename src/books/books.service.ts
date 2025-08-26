import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookBackup } from 'src/type/params';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookrepo: Repository<Book> ,     
              @InjectRepository(Author)private authorrepo: Repository<Author>,) { }

  create(createBookBackup: CreateBookBackup) {
    const newBook = this.bookrepo.create({
      ...createBookBackup,
      createdAt: new Date,
      updatedAt: new Date
    })
    return this.bookrepo.save(newBook)
  }

  async findAll(genre?: string, language?: string): Promise<Book[]> {
    if ([genre, language].every(item => !item)) {
      return this.bookrepo.find({ relations: ['author'] })
    }

    let query = this.bookrepo.createQueryBuilder('book');

    if (genre) {
      query = query.where('book.genre = :genre', { genre });
    }

    if (language) {
      if (genre) {
        query = query.andWhere('book.language = :language', { language })
      } else {
        query = query.where('book.language = :language', { language })
      }
    }
    return await query.getMany();
  }

  async findOne(id: number) {
    const IsExist = await this.bookrepo.findOne({ where: { id }, relations: ['author'] });
    if (!IsExist)
      throw new HttpException('Empty or Invalid Key Token', HttpStatus.BAD_REQUEST)
    return IsExist;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const IsExist = await this.bookrepo.findOneBy({ id })
    if (!IsExist)
      throw new HttpException('Empty or Invalid Key Token', HttpStatus.BAD_REQUEST)
    return this.bookrepo.update({ id }, { ...updateBookDto, updatedAt: new Date })
  }
  async assignAuthor(bookId: number, authorId: number): Promise<Book> {
  const book = await this.bookrepo.findOne({ where: { id: bookId } });
  if (!book) throw new NotFoundException('Book not found');

  const author = await this.authorrepo.findOne({ where: { id: authorId } });
  if (!author) throw new NotFoundException('Author not found');

  book.author = author;
  book.authorId = author.id;

  return this.bookrepo.save(book);
}

  async remove(id: number) {
    const IsExist = await this.bookrepo.findOneBy({ id })
    if (!IsExist)
      throw new HttpException('Empty or Invalid Key Token', HttpStatus.BAD_REQUEST)
    this.bookrepo.delete({ id })
  }

  async findBookByName(title: string) {
    const IsExist = await this.bookrepo.findOne({ where: { title }, relations: ['author'] })
    if (!IsExist)
      throw new HttpException('Empty or Invalid Key Token', HttpStatus.BAD_REQUEST)
    return IsExist
  }

  // async filterByGenre(genre?: string): Promise<Book[]> {
  //   const query = this.bookrepo.createQueryBuilder('book');

  //   if (genre) {
  //     query.where('book.genre = :genre', { genre });
  //   }

  //   return await query.getMany();
  // }
  //   async filterByLanguage(language?: string): Promise<Book[]> {
  //   const query = this.bookrepo.createQueryBuilder('book');

  //   if (language) {
  //     query.where('book.language = :language', { language });
  //   }

  //   return await query.getMany();
  // }
}

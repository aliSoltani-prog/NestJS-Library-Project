import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { Book } from 'src/books/entities/book.entity';
import { CreateAuthorBackup} from 'src/type/params';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Book)
    private bookrepo: Repository<Book>,

    @InjectRepository(Author)
    private authorrepo: Repository<Author>,
  ) {}

    create(createAuthorDto: CreateAuthorBackup) {
      const newAuthor = this.authorrepo.create({
        ...createAuthorDto,
        createdAt: new Date,
        updatedAt: new Date
      })
      return this.authorrepo.save(newAuthor)
    }
  
    findAll(){
      const authors = this.authorrepo.find({ relations : ['books']})
      return authors
    }
  
    async findOne(id: number) {
      const IsExist = await this.authorrepo.findOne({ where: { id } , relations: ['books']});
      if (!IsExist)
        throw new HttpException('Empty or Invalid Key Token', HttpStatus.BAD_REQUEST)
      return IsExist;
    }
  
    async update(id: number, updateAuthorDto: UpdateAuthorDto) {
      const IsExist = await this.authorrepo.findOneBy({ id })
      if (!IsExist)
        throw new HttpException('Empty or Invalid Key Token', HttpStatus.BAD_REQUEST)
      return this.authorrepo.update({ id }, { ...updateAuthorDto, updatedAt: new Date })
    }
  
    async remove(id: number) {
      const IsExist = await this.authorrepo.findOneBy({ id })
      if (!IsExist)
        throw new HttpException('Empty or Invalid Key Token', HttpStatus.BAD_REQUEST)
      this.authorrepo.delete({ id })
    }
  
    async findAuthorByName(name: string) {
      const IsExist = await this.authorrepo.findOne({ where: { name }, relations: ['books'] })
      if (!IsExist)
        throw new HttpException('Empty or Invalid Key Token', HttpStatus.BAD_REQUEST)
      return IsExist
    }
  
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookBackup } from 'src/type/params';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookrepo : Repository<Book>){}
  
  create(createBookBackup: CreateBookBackup) {
    const newBook =   this.bookrepo.create({...createBookBackup, 
      createdAt:new Date,
      updatedAt:new Date
    })
  return this.bookrepo.save(newBook)}

  findAll() {
    return this.bookrepo.find({relations:['author']})
  }

  async findOne(id: number) {
    const IsExist = await this.bookrepo.findOne({ where: { id }, relations: ['author'] });
    if (!IsExist) 
      throw new HttpException('Empty or Invalid Key Token',HttpStatus.BAD_REQUEST)
    return IsExist;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const IsExist = await this.bookrepo.findOneBy({id})
    if (!IsExist) 
      throw new HttpException('Empty or Invalid Key Token',HttpStatus.BAD_REQUEST)
    return this.bookrepo.update({id}, {...updateBookDto , updatedAt:new Date})
}

  async remove(id: number) {
    const IsExist = await this.bookrepo.findOneBy({ id })
    if (!IsExist) 
      throw new HttpException('Empty or Invalid Key Token',HttpStatus.BAD_REQUEST)
    this.bookrepo.delete({ id })
  }

  async findBookByName( title : string){
    const IsExist = await this.bookrepo.findOne({ where: {title} , relations: ['author'] })
    if (!IsExist) 
      throw new HttpException('Empty or Invalid Key Token',HttpStatus.BAD_REQUEST)
    return IsExist
  }
}

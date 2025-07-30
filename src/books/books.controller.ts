import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { HeaderRoleGuard } from 'src/guards/role/role.guard';
import { RequireRoles } from 'src/decorators/role/role.decorator';
import { Roles } from 'src/users/entities/user.entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetAllBooksDto, GetOneBookByIDDto, GetOneBookByTitleDto } from 'src/type/type';

@ApiBearerAuth()
@UseGuards(HeaderRoleGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({summary: 'create a new book'})
  @ApiCreatedResponse({
    description:'book created' ,
    type: CreateBookDto
  })
  @RequireRoles(Roles.Admin)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({summary: 'Fetch All the users'})
  @ApiOkResponse({description :  ' All users Fetched' , type : GetAllBooksDto})
  @RequireRoles(Roles.Admin , Roles.User , Roles.Guest)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @ApiOperation({summary: 'search for the user using ID'})
  @ApiOkResponse({description : 'user found in library' , type : GetOneBookByIDDto})
  @ApiBadRequestResponse({description : 'book did not found in library'})
  @RequireRoles(Roles.Admin , Roles.User , Roles.Guest)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Get(':id')
  findOne(@Param('id' , ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @ApiOperation({summary: 'edit existing book'})
  @ApiOkResponse({description :  ' All users Fetched' ,
    type:UpdateBookDto
  })
  @ApiBody({type : UpdateBookDto})
  @ApiBadRequestResponse({description : 'bad payload sent'})
  @RequireRoles(Roles.Admin)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Patch(':id')
  update(@Param('id' , ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }
  
  @ApiOperation({summary: 'delete an Existing book using ID'})
  @ApiOkResponse({description :  'book removed from library'})
  @ApiBadRequestResponse({description : 'bad payload sent'})
  @RequireRoles(Roles.Admin)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
  
  @ApiOperation({summary: 'search for Book using title'})
  @ApiOkResponse({description :  'book found in library' , type : GetOneBookByTitleDto})
  @ApiBadRequestResponse({description : 'book did not found in library'})
  @RequireRoles(Roles.Admin ,Roles.User , Roles.Guest)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Get('title/:title')
  findBookByName(@Param('title') title: string) {
    return this.booksService.findBookByName(title);
  }
}

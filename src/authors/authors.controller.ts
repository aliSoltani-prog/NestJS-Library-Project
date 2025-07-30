import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Throttle } from '@nestjs/throttler';
import { HeaderRoleGuard } from 'src/guards/role/role.guard';
import { RequireRoles } from 'src/decorators/role/role.decorator';
import { Roles } from 'src/users/entities/user.entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { createTracing } from 'trace_events';
//import { UpdateAuthorDto } from './dto/update-author.dto';
@ApiBearerAuth()
@UseGuards(HeaderRoleGuard)
@Controller('books')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}


  @ApiOperation({summary : 'creating an author'})
  @ApiCreatedResponse({description : 'the author that related to book created', 
    type : CreateAuthorDto
  })
  @ApiBadRequestResponse({description : 'book did not found or bad payload sent'})
  @RequireRoles(Roles.Admin)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Post(':id/authors')
  create(@Param ('id' , ParseIntPipe) id : number , @Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(id , createAuthorDto);
  }

  //@Get()
  //findAll() {
  //  return this.authorsService.findAll();
  //}
//
  //@Get(':id')
  //findOne(@Param('id') id: string) {
  //  return this.authorsService.findOne(+id);
  //}
//
  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
  //  return this.authorsService.update(+id, updateAuthorDto);
  //}
//
  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //  return this.authorsService.remove(+id);
  //}
}

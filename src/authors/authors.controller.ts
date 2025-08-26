import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Throttle } from '@nestjs/throttler';
import { HeaderRoleGuard } from 'src/guards/role/role.guard';
import { RequireRoles } from 'src/decorators/role/role.decorator';
import { Roles } from 'src/users/entities/user.entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { GetAllAuthorDto, GetOneAuthorByNameDto, GetOneAuthorDto } from 'src/type/type';




@ApiBearerAuth()
@UseGuards(HeaderRoleGuard)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}


  @ApiOperation({summary : 'creating an author'})
  @ApiCreatedResponse({description : 'insert the authors information', 
    type : CreateAuthorDto
  })
  @ApiBadRequestResponse({description : 'bad payload sent'})
  @RequireRoles(Roles.Admin)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create( createAuthorDto);
  }

  @ApiOperation({summary: 'Fetch All the Author'})
  @ApiOkResponse({description :  ' All Authors Fetched' , type : GetAllAuthorDto})
  @RequireRoles(Roles.Admin , Roles.User , Roles.Guest)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Get()
  findAll() {
   return this.authorsService.findAll();
  }

  @ApiOperation({summary: 'search for the Author using ID'})
  @ApiOkResponse({description : 'Author found in library' , type : GetOneAuthorDto})
  @ApiBadRequestResponse({description : 'Author did not found in library'})
  @RequireRoles(Roles.Admin , Roles.User , Roles.Guest)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Get(':id')
  findOne(@Param('id' , ParseIntPipe) id: number) {
   return this.authorsService.findOne(id);
  }

  @ApiOperation({summary: 'edit existing Author'})
  @ApiOkResponse({description :  ' All Authors Fetched' ,
    type:UpdateAuthorDto
  })
  @ApiBody({type : UpdateAuthorDto})
  @ApiBadRequestResponse({description : 'bad payload sent'})
  @RequireRoles(Roles.Admin)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Patch(':id')
  update(@Param('id' , ParseIntPipe) id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
   return this.authorsService.update(id, updateAuthorDto);
  }

  @ApiOperation({summary: 'delete an Existing Author using ID'})
  @ApiOkResponse({description :  'Author removed from library'})
  @ApiBadRequestResponse({description : 'bad payload sent'})
  @RequireRoles(Roles.Admin)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Delete(':id')
  remove(@Param('id' , ParseIntPipe) id: number) {
   return this.authorsService.remove(id);
  }

  @ApiOperation({summary: 'search for Author using name'})
  @ApiOkResponse({description :  'Author found in library' , type : GetOneAuthorByNameDto})
  @ApiBadRequestResponse({description : 'Author did not found in data base'})
  @RequireRoles(Roles.Admin ,Roles.User)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Get('name/:name')
  findAuthorByName(@Param('name') name: string) {
    return this.authorsService.findAuthorByName(name);
  }
}

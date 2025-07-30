import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserBackup } from 'src/type/params';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { HeaderRoleGuard } from 'src/guards/role/role.guard';
import { Roles } from './entities/user.entity';
import { RequireRoles } from '../decorators/role/role.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetAllUsersDto, GetOneUserDto } from 'src/type/type';

@ApiBearerAuth()
@UseGuards(HeaderRoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary : 'a user signedUp '})
  @ApiCreatedResponse({ description : 'new user created' , type : CreateUserDto})
  @ApiBadRequestResponse({ description : 'you did not put the correct information in request body'})
  @RequireRoles(Roles.Admin , Roles.User , Roles.Guest )
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary : 'Fetching All users '})
  @ApiOkResponse({ description : 'users Fetched' , type : GetAllUsersDto})
  @RequireRoles(Roles.Admin , Roles.User  )
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary : 'looking for one user using ID '})
  @ApiOkResponse({ description : 'user found in data base' , type : GetOneUserDto })
  @ApiBadRequestResponse({description: 'user did not found'})
  @RequireRoles(Roles.Admin , Roles.User   , Roles.Guest)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id' , ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary : 'Edit the users information'})
  @ApiOkResponse({ description : 'the users information Edited' })
  @ApiBadRequestResponse({description: 'user did not found or you did not put the correct information in request body'})
  @RequireRoles(Roles.Admin , Roles.User  )
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Patch(':id')
  update(@Param('id' , ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary : 'removing the user by ID'})
  @ApiOkResponse({ description : 'removed the Existing user' })
  @ApiBadRequestResponse({description: 'user did not found'})
  @RequireRoles(Roles.Admin)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Delete(':id')
  remove(@Param('id' , ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}

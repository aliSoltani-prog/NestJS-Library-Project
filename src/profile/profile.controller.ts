import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Throttle } from '@nestjs/throttler';
import { HeaderRoleGuard } from 'src/guards/role/role.guard';
import { Roles } from 'src/users/entities/user.entity';
import { RequireRoles } from 'src/decorators/role/role.decorator';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(HeaderRoleGuard)
@Controller('users')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary : 'create a profile based on user ID'})
  @ApiOkResponse({description : 'profile created' , type : CreateProfileDto})
  @ApiForbiddenResponse({description :' the user did not found or the data is invalid'})
  @RequireRoles(Roles.Admin , Roles.User)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Post(':id/profile')
  create(@Param('id',ParseIntPipe)id : number , @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(id , createProfileDto);
  }

  //@Get()
  //findAll() {
  //  return this.profileService.findAll();
  //}
//
  //@Get(':id')
  //findOne(@Param('id') id: string) {
  //  return this.profileService.findOne(+id);
  //}
//
  @ApiOperation({ summary : 'Editing a profile based on user ID and Profile ID'})
  @ApiOkResponse({description : 'profile Updated' , type : UpdateProfileDto})
  @ApiForbiddenResponse({description :' the user or profile did not found or the data is invalid'})
  @RequireRoles(Roles.Admin , Roles.User)
  @Throttle({default:{ ttl : 20000 , limit : 5}})
  @Patch(':id/profile/:id')
  update(@Param('id' , ParseIntPipe) id: number,@Param('id', ParseIntPipe) P_id  : number, @Body() updateProfileDto: UpdateProfileDto ) {
   return this.profileService.update(id , P_id , updateProfileDto );
  }

  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //  return this.profileService.remove(+id);
  //}
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileBackup } from 'src/type/params';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';




@Injectable()
export class ProfileService {
  constructor(@InjectRepository(User) private userrepo:Repository<User> , 
              @InjectRepository(Profile) private profilerepo:Repository<Profile>){}


  async create(id : number , createProfileBackup: CreateProfileBackup) {
    const IsExist  = await this.userrepo.findOneBy({id})
    if (!IsExist){
      throw new HttpException('passing invalid key to find user', HttpStatus.FORBIDDEN)
    }
    const newProfile = this.profilerepo.create(createProfileBackup)
    const saveProfile = this.profilerepo.save(newProfile)
    IsExist.profile = await saveProfile;
    return this.userrepo.save(IsExist)
  }

  //findAll() {
  //  return `This action returns all profile`;
  //}
//
  //findOne(id: number) {
  //  return `This action returns a #${id} profile`;
  //}
//
  async update(id: number, P_id : number ,updateProfileDto: UpdateProfileDto ) {
    const IsUserExist = await this.userrepo.findOneBy({ id }) 
    if (!IsUserExist){
      throw new HttpException('passing invalid key to find user', HttpStatus.FORBIDDEN)
    }

    const IsProfileExist =  await this.profilerepo.findOneBy({ id })
    if (!IsProfileExist){
      throw new HttpException('this user does not have any profile', HttpStatus.FORBIDDEN)
    }

    const updateProfile = this.profilerepo.update( {id} , {...updateProfileDto , updatedAt:new Date})
    return updateProfile;
  }

  //remove(id: number) {
  //  return `This action removes a #${id} profile`;
  //}
}

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
  //update(id: number, updateProfileDto: UpdateProfileDto) {
  //  return `This action updates a #${id} profile`;
  //}
//
  //remove(id: number) {
  //  return `This action removes a #${id} profile`;
  //}
}

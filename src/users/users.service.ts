import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserBackup } from 'src/type/params';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Hashthepassword } from 'src/utils/bcrypt';
import { Profile } from 'src/profile/entities/profile.entity';
import { plainToInstance } from 'class-transformer';



@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userrepo : Repository<User>){}
  create(createUserBackup: CreateUserBackup) {
    const password =  Hashthepassword(createUserBackup.password) //Authenticathon
    const newUser = this.userrepo.create({...createUserBackup, createdAt : new Date , updatedAt : new Date , password})
    if (!newUser) {
      throw new HttpException('You did not enter the information correctly', HttpStatus.BAD_REQUEST)
    }
    return this.userrepo.save(newUser)
  }

  findAll() {
    const users = this.userrepo.find({relations:['profile']})
    return plainToInstance(User, users, { excludeExtraneousValues: true });
  }

  async findOne(id: number) {
    const IsExist =  await this.userrepo.findOne({ where: { id }, relations: ['profile'] });
    if (!IsExist){
      throw new HttpException('User Did Not Found', HttpStatus.BAD_REQUEST)
    }
    return plainToInstance(User, IsExist, { excludeExtraneousValues: true });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const IsExist =  await this.userrepo.findOneBy({ id })
    if (!IsExist){
      throw new HttpException('User Did Not Found', HttpStatus.BAD_REQUEST)
    }
    return this.userrepo.update({ id } , {...updateUserDto , updatedAt:new Date})
  }

  async remove(id: number) {
  await this.userrepo.manager.transaction(async (manager) => {
    const IsExist = await manager.findOne(User, { where: { id }, relations: ['profile'] });
    if (!IsExist){
      throw new HttpException('User Did Not Found', HttpStatus.BAD_REQUEST)
    }
    await manager.remove(Profile, IsExist?.profile);
    await manager.remove(User, IsExist);
});

  }
  async findByUsername(username : string): Promise<User | null>{
    return await this.userrepo.findOneBy({username})
  }
}

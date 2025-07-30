import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"
import { Roles } from "../entities/user.entity"
import { CreateProfileDto } from "src/profile/dto/create-profile.dto"
import { Exclude, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    
    @ApiProperty({example : 'example'})
    @IsString()
    @IsNotEmpty()
    username : string
    
    @ApiProperty({example : Roles.User , enum : Roles , default : Roles.Guest , required : false})
    @IsEnum(Roles)
    @IsOptional()
    role : Roles = Roles.Guest 

    @ApiProperty({example : 'ali@codes.cpm'})
    @IsEmail()
    @IsNotEmpty()
    email : string
    
    @ApiProperty({example : '123456'})
    @IsString()
    @IsNotEmpty()
    password : string

    @ValidateNested()
    @Type(() => CreateProfileDto)
    profile: CreateProfileDto;
}

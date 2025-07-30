import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Genre, Language } from "../books/entities/book.entity";
import { ApiProperty } from "@nestjs/swagger";

export class GetAllBooksDto {
    
    @ApiProperty({example : 1 })
    id : number

    @ApiProperty({example : 'example'})
    @IsNotEmpty()
    @IsString()
    title : string

    @ApiProperty({example : 2 , required : false})
    @IsNumber()
    authorId: number

    @ApiProperty({example : 'translator example' , required : false})
    @IsString()
    @IsOptional()
    translator : string

    @ApiProperty({example : 7})
    @IsNotEmpty()
    @IsNumber()
    edition: number

    @ApiProperty({example : 'publisher example'})
    @IsNotEmpty()
    @IsString()
    publisher : string

    @ApiProperty({enum: Language , example : Language.English , required : false  , default : Language.Persian})
    @IsOptional()
    language : Language = Language.Persian
    
    @ApiProperty({enum: Genre , example :Genre.Fantasy})
    @IsNotEmpty()
    @IsOptional()
    genre : Genre


}
export class GetOneBookByIDDto {
    
    @ApiProperty({example : 1 })
    id : number

    @ApiProperty({example : 'example'})
    @IsNotEmpty()
    @IsString()
    title : string

    @ApiProperty({example : 2 , required : false})
    @IsNumber()
    authorId: number

    @ApiProperty({example : 'translator example' , required : false})
    @IsString()
    @IsOptional()
    translator : string

    @ApiProperty({example : 7})
    @IsNotEmpty()
    @IsNumber()
    edition: number

    @ApiProperty({example : 'publisher example'})
    @IsNotEmpty()
    @IsString()
    publisher : string

    @ApiProperty({enum: Language , example : Language.English , required : false  , default : Language.Persian})
    @IsOptional()
    language : Language = Language.Persian
    
    @ApiProperty({enum: Genre , example :Genre.Fantasy})
    @IsNotEmpty()
    @IsOptional()
    genre : Genre
}
import { IsEmail, IsEnum, ValidateNested } from "class-validator"
import { Roles } from "../users/entities/user.entity"
import { CreateProfileDto } from "src/profile/dto/create-profile.dto"
import { Type } from "class-transformer"

export class GetAllUsersDto {
    
    @ApiProperty({example : 1})
    id : number 

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
export class GetOneUserDto {
    
    @ApiProperty({example : 1})
    id : number 

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
export class GetOneBookByTitleDto {
    
    @ApiProperty({example : 1})
    id : number 

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


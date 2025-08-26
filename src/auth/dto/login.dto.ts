import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class login{

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example : 'example'})
    username : string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example : '123456'})
    password : string

}
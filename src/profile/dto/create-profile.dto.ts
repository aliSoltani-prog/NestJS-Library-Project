import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateProfileDto {

    @ApiProperty({example :'ali'})
    @IsString()
    @IsNotEmpty()
    firstname : string

    @ApiProperty({example : 'soltani'})
    @IsString()
    @IsNotEmpty()
    lastname : string

    @ApiProperty({example : '09900128812'})
    @IsString()
    @IsNotEmpty()
    phoneNumber : string

    @ApiProperty({ example : '1993-06-19'})
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    dateOfbirth : Date
}

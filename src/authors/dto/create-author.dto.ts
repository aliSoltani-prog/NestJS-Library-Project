import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateAuthorDto {

    @ApiProperty({example : "cris"})
    @IsNotEmpty()
    @IsString()
    name : string

    @ApiProperty({example : '1977-01-15'})
    @IsNotEmpty()
    @Type(() => Date) // تبدیل مقدار ورودی به Date
    @IsDate()
    dateOfBirth : Date

    @ApiProperty({example : 'example nationality' , required : false})
    @IsOptional()
    @IsString()
    nationality : string

}

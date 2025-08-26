import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Genre, Language } from "../entities/book.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
    
    
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
    @IsEnum(Language)
    language? : Language = Language.Persian
    
    @ApiProperty({enum: Genre , example :Genre.Fantasy })
    @IsNotEmpty()
    @IsEnum(Genre)
    @IsOptional()
    genre? : Genre


}

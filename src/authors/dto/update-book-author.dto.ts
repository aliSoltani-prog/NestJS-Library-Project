import { IsInt } from 'class-validator';

export class UpdateBookAuthorDto {
  @IsInt()
  authorId: number;
}
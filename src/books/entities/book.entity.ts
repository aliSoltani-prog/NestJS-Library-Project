import { Author } from "src/authors/entities/author.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Language{
    Persian = 'Persian',
    English ='English',
    Arabic ='Arabic'
}

export enum Genre{
    Action ='Action',
    Romance ='Romance',
    Comedy ='Comedy',
    Adventure ='Adventure',
    Horror ='Horror',
    Fantasy ='Fantasy',
    Historical ='Historical',
    Crime = 'Crime'
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Author, (author) => author.books  ,{nullable:true ,
    cascade:true,
    onDelete:'CASCADE'
  })
  @JoinColumn()
  author: Author; // ✅ فقط یک نویسنده

  @Column({ nullable: true })
  translator: string;

  @Column()
  edition: number;

  @Column()
  publisher: string;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.Persian
  })
  language: Language;

  @Column({
    type: 'enum',
    enum: Genre
  })
  genre: Genre;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({nullable:true})
  authorId: number; // ✅ درست و توصیه‌شده

}


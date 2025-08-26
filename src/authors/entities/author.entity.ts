import { Book } from "src/books/entities/book.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  nationality: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[]; // ✅ آرایه از کتاب‌ها

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

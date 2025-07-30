
import { Exclude, Expose } from "class-transformer";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Roles {
  Admin = 'Admin',
  User = 'User',
  Guest = 'Guest' // ✅ نه Geust
}

@Entity()
export class User {

    @Expose()
    @PrimaryGeneratedColumn()
    id : number

    @Expose()
    @Column({unique:true})
    username : string

    @Expose()
    @Column({
        type:'enum'
        , default:Roles.Guest
        , enum : Roles
    })
    role : Roles

    @Expose()
    @Column({unique:true})
    email : string

    @Column()
    @Exclude()
    password : string

    @Expose()
    @OneToOne(()=>Profile , (profile) => profile.user  , {
      cascade:true , 
      onDelete:'CASCADE'
    })
    @JoinColumn()
    profile:Profile

    @Expose()
    @CreateDateColumn()
    createdAt : Date

    @Expose()
    @UpdateDateColumn()
    updatedAt : Date
}

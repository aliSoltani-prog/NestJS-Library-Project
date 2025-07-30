import { Expose } from "class-transformer"
import { User } from "src/users/entities/user.entity"
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Profile {
  
    @Expose()
    @PrimaryGeneratedColumn()
    id : number

    @Expose()
    @Column()
    firstname : string

    @Expose()
    @Column()
    lastname : string

    @Expose()
    @Column({unique : true})
    phoneNumber : string

    @Expose()
    @Column()
    dateOfbirth : Date

    @Expose()
    @OneToOne(()=> User , (user)=>user.profile)
    user : User

    @Expose()
    @CreateDateColumn()
    createdAt : Date

    @Expose()
    @UpdateDateColumn()
    updatedAt : Date


}

import { Roles } from "src/users/entities/user.entity"

export class CreateBookBackup{
    title : string
    authorId: number
    translator : string
    edition: number
    publisher : string
}

export class createAuthorBackup{
    name : string
    dateOfBirth : Date
    nationality? : string
    
}

export class CreateUserBackup{
    username : string
    email : string
    password : string

}
export class CreateProfileBackup{
    firstname : string
    lastname : string
    phoneNumber : string
    dateOfbirth : Date
}
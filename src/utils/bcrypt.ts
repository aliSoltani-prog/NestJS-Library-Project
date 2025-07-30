import * as bcrypt from 'bcrypt'


export function Hashthepassword(rawPassword : string){
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword,SALT)
}
export function compareTheHashes(rawPassword:string , hashed : string){
    return bcrypt.compareSync(rawPassword,hashed)
}
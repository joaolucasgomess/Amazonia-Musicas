import { IUserData } from '../model/InterfaceUserData'
import User from '../model/User' 
import { db } from '../Data/Connection'

export default class UserData implements IUserData {
    
    async getUserByEmail(email: string): Promise<User | null> {
        try{
            const result = await db
                .select(
                    'uuid_user', 
                    'user_name', 
                    'user_email', 
                    'user_password'
                    )
                .from('users')
                .where('user_email', email)

                let user: User | null = null

                if(!result.length){
                    return null
                }

                user = new User(
                    result[0].uuid_user,
                    result[0].user_name,
                    result[0].user_email,
                    result[0].user_password
                )

                return user
        }catch(err: any){
            throw new Error(err.message)
        }
    }

    async insertUser(user: User): Promise<User> {
        try{
            await db('users')
                .insert({ 
                    uuid_user: user.id,
                    user_name: user.name,
                    user_email: user.email,
                    user_password: user.password
                 })
            return user
        }catch(err: any){
            throw new Error(err.message);
        }
    }

}
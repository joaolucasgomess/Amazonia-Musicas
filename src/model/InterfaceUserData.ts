import User from './User'

export interface IUserData {
    getUserByEmail(email: string): Promise<User | null>
    insertUser(user: User): Promise<User>
}

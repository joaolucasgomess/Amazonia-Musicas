import User from '../model/User'
import { CustomError } from '../Utils/CustomError'
import { IUserData } from '../model/InterfaceUserData'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { generatedId } from '../services/IdGenerator'
import { SignupInputDTO } from '../types/types'
import { LoginInputDTO } from '../types/types'

export class UserBusiness {
    private userData: IUserData
    private hashManager: HashManager
    private authenticator: Authenticator

    constructor(userDataRepository: IUserData){
        this.userData = userDataRepository
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator()
    }

    signup = async(input: SignupInputDTO) => {
        try{
            const { name, email, password } = input

            if(!name || !email || !password){
                throw new CustomError("Campos inválidos", 422)
            }

            const registeredUser = await this.userData.getUserByEmail(email)

            if(registeredUser){
                throw new CustomError("E-mail já cadastrado", 409)
            }

            const id = generatedId()
            const hashedPassword = await this.hashManager.hash(password)
            const user = new User(id, name, email, hashedPassword)
            await this.userData.insertUser(user)
            const token = this.authenticator.generateToken({ id })
            return token
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    login = async(input: LoginInputDTO) => {
        try{
            const { email, password } = input

            if(!email || !password){
                throw new CustomError("Campos inválidos", 422)
            }

            const user = await this.userData.getUserByEmail(email)

            if(!user){
                throw new CustomError("Usuário ainda não cadastrado", 404)
            }

            const passwordIsCorrect = await this.hashManager.compare(password, user.password)

            if(!passwordIsCorrect){ 
                throw new CustomError("Senha incorreta", 401)
            }

            const token = this.authenticator.generateToken({ id: user.id })
            return token
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }
}

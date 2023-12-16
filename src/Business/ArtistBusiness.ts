import { IArtistData } from '../model/InterfaceArtistData'
import { Authenticator } from '../services/Authenticator'
import { generatedId } from '../services/IdGenerator'
import { CustomError } from '../Utils/CustomError'
import Artist from '../model/Artist'

export class ArtistBusiness {
    private artistData: IArtistData
    private authenticator: Authenticator

    constructor(artistDataRepository: IArtistData){
        this.artistData = artistDataRepository
        this.authenticator = new Authenticator()
    }

    addArtist = async (token: string, name: string): Promise<void> => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }

            const tokenData = this.authenticator.getTokenData(token)

            if(!tokenData){
                throw new CustomError("Token inválido", 401)
            }

            if(!name){
                throw new CustomError("Campo inválido", 422)                    
            }

            const artistByName = await this.artistData.selectArtistByName(name)

            if(artistByName){
                throw new CustomError("Artista já cadastrado", 403)
            }

            const id = generatedId()
            const newArtist = new Artist(id, name)
            await this.artistData.createArtist(newArtist)

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }
}
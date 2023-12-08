import { CustomError } from '../Utils/CustomError'
import { ITrackData } from '../model/InterfaceTrackData'
import { Authenticator } from '../services/Authenticator'
import  Track  from '../model/Track'

export class TrackBusiness {
    private trackData: ITrackData
    private authenticator: Authenticator

    constructor(userDataRepository: ITrackData){
        this.trackData = userDataRepository
        this.authenticator = new Authenticator()
    }

    getAllTracks = async(token: string): Promise<Track[] | string> => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }

            const userId = this.authenticator.getTokenData(token)

            if(!userId){
                throw new CustomError("Token inválido", 401)
            }

            const allTracks = await this.trackData.selectAllTracks()

            if(!allTracks.length){
                throw new CustomError("Ainda não existem músicas adicionadas", 404)
            }
            return allTracks
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }
}
import { CustomError } from '../Utils/CustomError'
import { ITrackData } from '../model/InterfaceTrackData'
import { Authenticator } from '../services/Authenticator'
import { AddTrackInputDTO } from '../types/types'
import { generatedId } from '../services/IdGenerator'
import  Track  from '../model/Track'

export class TrackBusiness {
    private trackData: ITrackData
    private authenticator: Authenticator

    constructor(trackDataRepository: ITrackData){
        this.trackData = trackDataRepository
        this.authenticator = new Authenticator()
    }

    getAllTracks = async (token: string): Promise<Track[]> => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }

            const tokenData = this.authenticator.getTokenData(token)

            if(!tokenData){
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

    getTrackById = async (token: string, id: string): Promise<Track> => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }

            const tokenData = this.authenticator.getTokenData(token)

            if(!tokenData){
                throw new CustomError("Token inválido", 401)
            }   

            if(!id){
                throw new CustomError("É necessário informar um Id", 422)
            }

            const trackById = await this.trackData.selectTrackById(id)

            if(!trackById){
                throw new CustomError("Música ainda não cadastrada", 404)   
            }

            return trackById 
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    addTrack = async (token: string, newTrackInput: AddTrackInputDTO): Promise<void> => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }

            const tokenData = this.authenticator.getTokenData(token)

            if(!tokenData){
                throw new CustomError("Token inválido", 401)
            } 
            
            const { name, artists, url } = newTrackInput

            if(!name || !artists || !url){
                throw new CustomError("Campos inválidos", 422)
            }

            const trackByUrl = await this.trackData.selectTrackByUrl(url) // verificar 

            if(trackByUrl){
                throw new CustomError("Música já existe", 403)
            }

            const trackArtist = await this.trackData.selectTrackArtist(artists) // buscar método da business do Artist e não definir metodo return Artist da TrackData

            if(!trackArtist){
                throw new CustomError("O artista informado ainda não foi cadastrado", 404)
            }

            const id = generatedId()
            // estanciar os artistas da musica
            const newTrack = new Track(id, name, artists, url, tokenData.id)
            await this.trackData.createTrack(newTrack)

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }
}
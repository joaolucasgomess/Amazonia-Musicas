import Playlist from '../model/Playlist'
import { IPlaylistData } from '../model/InterfacePlaylist'
import { Authenticator } from '../services/Authenticator'
import { generatedId } from '../services/IdGenerator'
import { CustomError } from '../Utils/CustomError'

export class PlaylistBusiness  {
    private playlistData: IPlaylistData
    private authenticator: Authenticator
    
    constructor(playlistRepository: IPlaylistData){
        this.playlistData = playlistRepository
        this.authenticator = new Authenticator()
    }

    getAllPlaylists = async (token: string): Promise<Playlist[]> => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError("Token inválido", 401)
            }
    
            const allPlaylists = await this.playlistData.selectAllPlaylists()

            if(!allPlaylists){
                throw new CustomError("Não existem playlists cadastradas", 404)
            }

            return allPlaylists
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    getPlaylistById = async (token: string, id: string): Promise<Playlist> => {
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

            const playlistById = await this.playlistData.selectPlaylistById(id)

            if(!playlistById){
                throw new CustomError("Playlist não existe", 404)
            }

            return playlistById
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    getPlaylistByName = async (token: string, name: string): Promise<Playlist[]> => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError("Token inválido", 401)
            }

            if(!name){
                throw new CustomError("É necessário informar um nome", 422)
            }

            const playlistByName = await this.playlistData.selectPlaylistByName(name)

            if(!playlistByName){
                throw new CustomError("Playlist não existe", 404)
            }

            return playlistByName
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    getPlaylistsByUser = async (token: string): Promise<Playlist[]> => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError("Token inválido", 401)
            }

            const plylistByUserId = await this.playlistData.selectPlaylistByUserId(tokenData.id)

            if(!plylistByUserId){
                throw new CustomError("Nenhuma playlist criada por seu usuário", 404)
            }

            return plylistByUserId
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)s
        }
    }

    //TODO
}
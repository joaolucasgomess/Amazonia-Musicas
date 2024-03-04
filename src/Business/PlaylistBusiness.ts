import Playlist from '../model/Playlist'
import Track_Playlist from '../model/Track_Playlist'
import { IPlaylistData } from '../model/InterfacePlaylist'
import { ITrackData } from '../model/InterfaceTrackData'
import { IArtistData } from '../model/InterfaceArtistData'
import { Authenticator } from '../services/Authenticator'
import { generatedId } from '../services/IdGenerator'
import { CustomError } from '../Utils/CustomError'

export class PlaylistBusiness  {
    private playlistData: IPlaylistData
    private trackData: ITrackData
    private artistData: IArtistData
    private authenticator: Authenticator
    
    constructor(playlistRepository: IPlaylistData, trackRepository: ITrackData, artistRepository: IArtistData) {
        this.playlistData = playlistRepository
        this.trackData = trackRepository
        this.artistData = artistRepository
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

            const trackOnPlaylist = await this.trackData.selectTracksOnPlaylist(id)
            playlistById.tracks = trackOnPlaylist
            //TODO 

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
            throw new CustomError(err.message, err.statusCode)
        }
    }

    addPlaylist = async(token: string, name: string): Promise<void> => {
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

            const id = generatedId()
            const playlist = new Playlist(id, name, tokenData.id)
            await this.playlistData.insertNewPlaylist(playlist)
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    addTrackOnPlaylist = async(token: string, playlistId: string, trackId: string): Promise<void> => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }
    
            const tokenData = this.authenticator.getTokenData(token)
    
            if(!tokenData){
                throw new CustomError("Token inválido", 401)
            }

            if(!playlistId || !trackId) {
                throw new CustomError('Information is missing', 401)
            }

            const playlist = await this.playlistData.selectPlaylistById(playlistId) 

            if(!playlist){
                throw new CustomError('Playlist not found', 404)
            }

            if(tokenData.id !== playlist.idUserCreated){
                throw new CustomError('You do not have permission to change this playlist', 403)
            }

            const track = await this.trackData.selectTrackById(trackId)

            if(!track){
                throw new CustomError('Track not found', 404)
            }

            const track_playlist = await this.playlistData.selectTrackPlaylist(trackId, playlistId)

            if(track_playlist){
                throw new CustomError('Track already added on playlist', 403)
            }

            const newTrack_playlist = new Track_Playlist(trackId, playlistId)
            await this.playlistData.insertTrackOnPlaylist(newTrack_playlist)
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }
}
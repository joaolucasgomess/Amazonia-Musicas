import { IPlaylistData } from "../model/InterfacePlaylist"
import Playlist from "../model/Playlist"
import Track_Playlist from "../model/Track_Playlist"
import { db } from "./Connection"

export default class PlaylistData implements IPlaylistData {
    
    async selectAllPlaylists(): Promise<Playlist[]>{
        try{
            const result = await db('playlist')
                .select(
                    'uuid_playlist',
                    'playlist_name',
                    'uuid_user_created'
                )

                const allPlaylists = result.map((playlist) => {
                    return new Playlist(
                        playlist.uuid_playlist,
                        playlist.playlist_name,
                        playlist.uuid_user_created
                    )
                })
                return allPlaylists
        }catch(err: any){
            throw new Error(err.message)
        }
    }

    async selectPlaylistById(id: string): Promise<Playlist | null> {
        try{
            const result = await db('playlist')
                .select(
                    'uuid_playlist',
                    'playlist_name',
                    'uuid_user_created'
                )
                .where('uuid_playlist', id)
                
                if(!result.length){
                    return null
                }

                return new Playlist(
                    result[0].uuid_playlist,
                    result[0].playlist_name,
                    result[0].uuid_user_created
                )
        }catch(err: any){   
            throw new Error(err.message)
        }
    }

    async selectPlaylistByName(name: string): Promise<Playlist[]> {
        try{
            const result = await db('playlist')
                .select(
                    'uuid_playlist',
                    'playlist_name',
                    'uuid_user_created'
                )
                .where('playlist_name', name)

                const playlists = result.map((playlist) => {
                    return new Playlist(
                        playlist.uuid_playlist,
                        playlist.playlist_name,
                        playlist.uuid_user_created
                    )
                })
                return playlists
        }catch(err: any){
            throw new Error(err.message)
        }         
        
    }

    async selectPlaylistByUserId(userId: string): Promise<Playlist[]> {
        try{
            const result = await db('playlist')
                .select(
                    'uuid_playlist',
                    'playlist_name',
                    'uuid_user_created'
                )
                .where('uuid_user_created', userId)

                const playlists = result.map((playlist) => {
                    return new Playlist(
                        playlist.uuid_playlist,
                        playlist.playlist_name,
                        playlist.uuid_user_created
                    )
                })
                return playlists
        }catch(err: any){
            throw new Error(err.message)
        }
    }

    async insertNewPlaylist(newPlaylist: Playlist): Promise<void> {
        try{
            await db('playlist')
                .insert({
                    uuid_playlist: newPlaylist.id,
                    playlist_name: newPlaylist.name,
                    uuid_user_created: newPlaylist.idUserCreated
                })
        }catch(err: any){
            throw new Error(err.message)
        }
    }

    async selectTrackPlaylist(trackId: string, playlistId: string): Promise<Track_Playlist| null> {
        try{
            const result = await db('track_playlist')
                .select(
                    'uuid_track',
                    'uuid_playlist'
                )
                .where({
                    uuid_track: trackId,
                    uuid_playlist: playlistId
                })

                if(!result.length){
                    return null
                }

                return new Track_Playlist(
                    result[0].uuid_track,
                    result[0].uuid_playlist
                )
        }catch(err: any){
            throw new Error(err.message)
        }
    }

    async insertTrackOnPlaylist(newTrack_playlist: Track_Playlist): Promise<void> {
        try{
            await db('track_playlist')
                .insert({
                    uuid_track: newTrack_playlist.trackId,
                    uuid_playlist: newTrack_playlist.playlistId
                })

        }catch(err:any){
            throw new Error(err.message)
        }
    }

}
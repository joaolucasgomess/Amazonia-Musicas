import Playlist from '../model/Playlist'

export interface IPlaylistData{
    selectAllPlaylists(): Promise<Playlist[]>
    selectPlaylistById(id: string): Promise<Playlist>
    selectPlaylistByName(name: string): Promise<Playlist[]>
    selectPlaylistByUserId(id: string): Promise<Playlist[]>
    //TODO
}
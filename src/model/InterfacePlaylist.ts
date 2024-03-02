import Playlist from '../model/Playlist'
import Track_Playlist from './Track_Playlist'

export interface IPlaylistData{
    selectAllPlaylists(): Promise<Playlist[]>
    selectPlaylistById(id: string): Promise<Playlist | null>
    selectPlaylistByName(name: string): Promise<Playlist[]>
    selectPlaylistByUserId(userId: string): Promise<Playlist[]>
    insertNewPlaylist(newPlaylist: Playlist): Promise<void>
    selectTrackPlaylist(trackId: string, playlistId: string): Promise<Track_Playlist | null>
    insertTrackOnPlaylist(newTrack_playlist: Track_Playlist): Promise<void>
}
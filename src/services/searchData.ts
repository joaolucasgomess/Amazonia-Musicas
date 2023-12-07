import * as types from '../types/types'
import { users, artists, tracks, playlists } from '../Utils/data'

export function getUserById(id: number): types.User | undefined {
    const user: types.User | undefined = users.find((user) => {
        return user.id === id
    })
    return user
}

export function getUserIndexById(id: number): number{
    const userIndex: number = users.findIndex((user) => {
        return user.id === id
    })
    return userIndex
}

export function checkFollowingOnUser(index: number, artistId: number): boolean{
    const alreadyFollow: number = users[index].artistsFollowingId.findIndex((id) => {
        return id === artistId
    })

    return alreadyFollow === -1 ? false : true
}

export function getTrackById(id: number): types.Track | undefined {
    const track: types.Track | undefined = tracks.find((track) => {
        return track.id === id
    })
    return track
}

export function getArtistById(id: number): types.Artist | undefined {
    const artist: types.Artist | undefined = artists.find((artist) => {
        return artist.id === id
    })
    return artist
}

export function getArtistIndexById(id: number){
    const artistIndex: number = artists.findIndex((artist) => {
        return artist.id === id
    })
    return artistIndex
}

export function getPlaylistById(id: number): types.Playlist | undefined {
    const playlist: types.Playlist | undefined = playlists.find((playlist) => {
        return playlist.id === id
    })
    return playlist
}

export function getPlaylistIndexById(id: number){
    const playlistIndex: number = playlists.findIndex((playlist) => {
        return playlist.id === id
    })
    return playlistIndex
}

export function checkTracksOnPlaylist(indexPlaylist: number, idTrack: number): boolean{
    const trackAlreadyAdded: number = playlists[indexPlaylist].tracks.findIndex((track) => {
        return idTrack === track
    })

    return trackAlreadyAdded === -1 ? false : true
}
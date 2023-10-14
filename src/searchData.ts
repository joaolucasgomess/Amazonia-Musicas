import * as types from './types'
import { users, artists, tracks, playlists } from './data'

export function getUserById(id: number): types.User | undefined {
    let user: types.User | undefined = users.find((user) => {
        return user.id === id
    })
    return user
}

export function getUserIndexById(id: number): number{
    let userIndex: number = users.findIndex((user) => {
        return user.id === id
    })
    return userIndex
}

export function checkFollowers(index: number, artistId: number): boolean{
    let alreadyFollow: number = users[index].artistsFollowingId.findIndex((id) => {
        return id === artistId
    })

    return alreadyFollow === -1 ? false : true
}

export function getTrackById(id: number): types.Track | undefined {
    let track: types.Track | undefined = tracks.find((track) => {
        return track.id === id
    })
    return track
}

export function getArtistById(id: number): types.Artist | undefined {
    let artist: types.Artist | undefined = artists.find((artist) => {
        return artist.id === id
    })
    return artist
}

export function getArtistIndexById(id: number){
    let artistIndex: number = artists.findIndex((artist) => {
        return artist.id === id
    })
    return artistIndex
}

export function getPlaylistById(id: number): types.Playlist | undefined {
    let playlist: types.Playlist | undefined = playlists.find((playlist) => {
        return playlist.id === id
    })
    return playlist
}

export function getPlaylistIndexById(id: number){
    let playlistIndex: number = playlists.findIndex((playlist) => {
        return playlist.id === id
    })
    return playlistIndex
}
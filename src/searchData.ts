import * as types from './types'
import { users, artists, tracks, playlists } from './data'

export function getUserById(id: number): types.User | undefined {
    let user: types.User | undefined = users.find((user) =>{
        return user.id === id
    })
    return user
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
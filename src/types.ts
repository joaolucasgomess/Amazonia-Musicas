export type Track = {
    id: number,
    name: string,
    artistId: number,
    url: string
    idUserAdded: number
}

export type Playlist = {
    id: number,
    name: string,
    tracks: number[],
    idUserCreated: number
}

export type Artist = {
    id: number,
    name: string
}

export type User = {
    id: number,
    userName: string
    artistsFollowingId: number[] 
}
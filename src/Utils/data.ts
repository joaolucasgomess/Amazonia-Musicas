import { Playlist, Track, Artist, User} from '../types/types'

export let users: User[] = [
    {
        id: 1,
        userName: 'JoaozinParabolica',
        artistsFollowingId: [1, 2]
    },
    {
        id: 2,
        userName: 'MariazinhaAntenas',
        artistsFollowingId: [1]
    }
]

export let artists: Artist[] = [
    {
        id: 1,
        name: 'Odeon',
        followers: 0
    },
    {
        id: 2,
        name: 'Korn',
        followers: 0
    }
]

export let tracks: Track[] = [
    {
        id: 1,
        name: 'game',
        artistId: 1,
        url: 'https://open.spotify.com/intl-pt/track/4OooP06iqUfzL6e4m2uVYq?si=33991273d3054572',
        idUserAdded: 1
    },
    {
        id: 2,
        name: 'ousadia',
        artistId: 1,
        url: 'https://open.spotify.com/intl-pt/track/5ky1hc5mPFZgwSNAMqyfC9?si=fdf9b15b87f749dc',
        idUserAdded: 2  
    },
    {
        id: 3,
        name: 'daydreams',
        artistId: 1,
        url: 'https://open.spotify.com/intl-pt/track/42SarCiXfEwum5KvF83jPl?si=d40f8ace76244e21',
        idUserAdded: 2 
    },
    {
        id: 4,
        name: 'Can You Hear Me',
        artistId: 2,
        url: 'https://open.spotify.com/intl-pt/track/5VXeawVov6ikGAaT0If8n9?si=55408528d6244784',
        idUserAdded: 1 
    }
]

export let playlists: Playlist[] = [
    {
        id: 1,
        name: 'rock trap contemporaneo moderno metal',
        tracks: [1, 4],
        idUserCreated: 1
    },
    {
        id: 2,
        name: 'a playlist de uma música só',
        tracks: [2],
        idUserCreated: 2
    }
]
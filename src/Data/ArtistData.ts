import Artist from '../model/Artist'
import { IArtistData } from '../model/InterfaceArtistData'
import { db } from './Connection'

export default class ArtistData implements IArtistData {
    
    async selectArtistByName(name: string): Promise<Artist | null> {
        try{
            const result = await db('artist')
                .select('uuid_artist', 'artist_name')
                .where('artist_name', name)

                if(!result.length){
                    return null
                }

                const artist = new Artist(
                    result[0].uuid_artist,
                    result[0].artist_name
                )
                return artist
        }catch(err: any){   
            throw new Error(err.message)
        }
    }

    async createArtist(newArtist: Artist): Promise<void> {
        try{
            await db('artist')
                .insert({
                    uuid_artist: newArtist.id,
                    artist_name: newArtist.name
                })
        }catch(err: any){
            throw new Error(err.message)
        }
    }

    async selectArtistById(id: string): Promise<Artist | null> {
        try{
            const result = await db('artist')
                .select(
                    'uuid_artist',
                    'artist_name'
                )
                .where('uuid_artist', id)

                if(!result.length){
                    return null
                }

                const artist = new Artist(
                    result[0].uuid_artist,
                    result[0].artist_name
                )
                return artist
        }catch(err: any){
            throw new Error(err.message)
        }
    }

    async selectArtistOnTrack(trackId: string): Promise<Artist[]> {
        try{
            const result = await db('artist as a')
                .select(
                    'a.uuid_artist',
                    'a.artist_name'
                )
                .join(
                    'track_artist as ta',
                    'a.uuid_artist',
                    'ta.uuid_artist'
                )
                .join(
                    'track as t',
                    't.uuid_track',
                    'ta.uuid_track'
                )
                .where('t.uuid_track', trackId)

                const artistsOnTrack = result.map((artist) => {
                    return new Artist(
                        artist.uuid_artist,
                        artist.artist_name
                    )
                })

                return artistsOnTrack
        }catch(err: any){   
            throw new Error(err.message)
        }            
    }
}
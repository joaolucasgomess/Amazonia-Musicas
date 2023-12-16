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
}
import { ITrackData } from '../model/InterfaceTrackData'
import Track from '../model/Track'
import { db } from '../Data/Connection' 
import Artist from '../model/Artist'

export default class TrackData implements ITrackData {

    async selectAllTracks(): Promise<Track[]> {
        try{
            const result = await db('track')
                .select(
                    'uuid_track',
                    'track_name',
                    'uuid_artist',
                    'url',
                    'uuid_user_added'
                )

                const allTracks = result.map((track) => {
                    return new Track(
                        track.uuid_track,
                        track.track_name,
                        track.uuid_artist,
                        track.url,
                        track.uuid_user_added
                    )
                })
                return allTracks
        }catch(err: any){
            throw new Error(err.message)
        }    
    }

    async selectTrackById (id: string): Promise<Track | null> {
        try{
            const result = await db('track')
                .select(
                    'uuid_track',
                    'track_name',
                    'uuid_artist',
                    'url',
                    'uuid_user_added'
                )
                .where('uuid_track', id)

                if(!result.length){
                    return null
                }

                return new Track(
                    result[0].uuid_track,
                    result[0].track_name,
                    result[0].uuid_artist,
                    result[0].url,
                    result[0].uuid_user_added,
                )
        }catch(err: any){
            throw new Error(err.message)
        }
    }

    async selectTrackByUrl(url: string): Promise<Track | null> {
        try{
            const result = await db('track')
                .select(
                    'uuid_track',
                    'track_name',
                    'uuid_artist',
                    'url',
                    'uuid_user_added'
                )
                .where('url', url)

                if(!result.length){
                    return null
                }

                return new Track(
                    result[0].uuid_track,
                    result[0].track_name,
                    result[0].uuid_artist,
                    result[0].url,
                    result[0].uuid_user_added,
                )
        }catch(err: any){
            throw new Error(err.message)
        } 
    }
    async selectTrackArtist(id: string): Promise<Artist | null> {
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

                return new Artist(
                    result[0].uuid_artist,
                    result[0].artist_name
                )

        }catch(err: any){
            throw new Error(err.message)
        }
    }

    async createTrack(newTrack: Track): Promise<void> {
        try{
            await db('track')
                .insert({
                    uuid_track: newTrack.id,
                    track_name: newTrack.name,
                    url: newTrack.url,
                    uuid_user_added: newTrack.idUserAdded,
                    uuid_artist: newTrack.idArtist
                })
        }catch(err: any){
            throw new Error(err.message)
        }
    }     
}
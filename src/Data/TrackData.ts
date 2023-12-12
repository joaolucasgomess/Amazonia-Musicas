import { ITrackData } from '../model/InterfaceTrackData'
import Track from '../model/Track'
import { db } from '../Data/Connection' 

export default class TrackData implements ITrackData {

    async selectAllTracks(): Promise<Track[]> {
        try{
            const result = await db('track')
                .select(
                    'uuid_track',
                    'track_name',
                    'uuid_artist',
                    'url',
                    'uuid_user'
                )

                const allTracks = result.map((track) => {
                    return new Track(
                        track.id,
                        track.name,
                        track.idArtist,
                        track.url,
                        track.idUserAdded
                    )
                })
                return allTracks
        }catch(err: any){
            throw new Error(err.message)
        }    
    }

    async selectTrackById (id: string): Promise<Track | null> {
        try{
            const result = await db
                .select(
                    'uuid_track',
                    'track_name',
                    'uuid_artist',
                    'url',
                    'uuid_user'
                )
                .where('track.uuid_track', id)

                if(!result.length){
                    return null
                }

                return new Track(
                    result[0].uuid_track,
                    result[0].track_name,
                    result[0].uuid_artist,
                    result[0].url,
                    result[0].uuid_user,
                )
        }catch(err: any){
            throw new Error(err.message)
        }
    }
}
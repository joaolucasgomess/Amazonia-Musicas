import { ITrackData } from '../model/InterfaceTrackData'
import Track from '../model/Track'
import { db } from '../Data/Connection' 

export default class TrackData implements ITrackData {

    async selectAllTracks(): Promise<Track[]> {
        try{
            const result = await db('track')
                .join('artist', 'track.id_artist', '=', 'artist.id_artist')
                .join('users', 'track.id_user_added', '=', 'users.id_user')
                .select(
                    'track.uuid_track',
                    'track.track_name',
                    'artist.uuid_artist',
                    'track.url',
                    'users.uuid_user'
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
}
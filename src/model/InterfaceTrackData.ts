import  Track from "./Track"
import Artist from "./Artist"

export interface ITrackData {
    selectAllTracks(): Promise<Track[]>
    selectTrackById(id: string): Promise<Track | null>
    selectTrackByUrl(url: string): Promise<Track | null>
    selectTrackArtist(id: string): Promise<Artist | null>
    createTrack(newTrack: Track): Promise<void>
}
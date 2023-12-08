import  Track from "./Track"

export interface ITrackData {
    selectAllTracks(): Promise<Track[]>
    selectTrackById(id: string): Promise<Track | null>
    //createTrack(newTrack: Track): Promise<void>
}
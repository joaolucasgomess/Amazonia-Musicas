import Artist from './Artist'

export interface IArtistData  {
    selectArtistByName(name: string): Promise<Artist | null>
    createArtist(newArtist: Artist): Promise<void>
    selectArtistById(id: string): Promise<Artist | null>
    selectArtistOnTrack(trackId: string): Promise<Artist[]> 
}
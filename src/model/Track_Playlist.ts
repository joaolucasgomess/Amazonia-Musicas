export default class Track_Playlist {
    public get trackId(): string {
        return this._trackId
    }
    public set trackId(value: string) {
        this._trackId = value
    }

    public get playlistId(): string {
        return this._playlistId
    }
    public set playlistId(value: string) {
        this._playlistId = value
    }

    constructor(
        private _trackId: string,
        private _playlistId: string    
    ){}
}

import Track from "./Track"

export default class Playlist {

    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }

    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }

    public get idUserCreated(): string {
        return this._idUserCreated
    }
    public set idUserCreated(value: string) {
        this._idUserCreated = value
    }

    public get tracks(): Track[] | undefined {
        return this._tracks 
    }
    public set tracks(value: Track[]) {
        this._tracks = value
    }

    constructor(
        private _id: string,
        private _name: string,
        private _idUserCreated: string,
        private _tracks?: Track[]
    ){}
}

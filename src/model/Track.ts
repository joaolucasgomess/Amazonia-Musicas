import Artist from './Artist'

export default class Track {

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

    public get artists(): Artist[] | undefined {
        return this._artists
    }
    public set artists(value: Artist[]) {
        this._artists = value
    }

    public get url(): string {
        return this._url
    }
    public set url(value: string) {
        this._url = value
    }

    public get idUserAdded(): string {
        return this._idUserAdded
    }
    public set idUserAdded(value: string) {
        this._idUserAdded = value
    }

    constructor(
        private _id: string,
        private _name: string,
        private _url: string,
        private _idUserAdded: string,
        private _artists?: Artist[]
    ){}
}

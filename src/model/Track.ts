
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

    public get idArtist(): string {
        return this._idArtist
    }
    public set idArtist(value: string) {
        this._idArtist = value
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
        private _idArtist: string,
        private _url: string,
        private _idUserAdded: string,
    ){}
}

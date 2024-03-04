import { Response, Request } from 'express'
import { ArtistBusiness } from '../Business/ArtistBusiness'

export class ArtistController {
    constructor(private artistBusiness:  ArtistBusiness) {}

    addArtist = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { name } = req.body
            await this.artistBusiness.addArtist(token, name)
            res.status(201).send("Artista adicionado com sucesso")
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    getArtistById = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id } = req.params
            const artistById = await this.artistBusiness.getArtistById(token, id)
            res.status(200).send({ artistById })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }
}

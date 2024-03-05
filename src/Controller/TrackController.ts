import { Request, Response } from 'express'
import { TrackBusiness } from '../Business/TrackBusiness'

export class TrackController {
    constructor(private trackBusiness: TrackBusiness) {}

    getAllTracks = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string 
            const allTracks = await this.trackBusiness.getAllTracks(token)
            res.status(200).send({ allTracks })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    getTrackById = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const id = req.params.id
            const trackById = await this.trackBusiness.getTrackById(token, id)
            res.status(200).send({ trackById })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    addTrack = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string 
            const { name, artists, url } = req.body
            await this.trackBusiness.addTrack(token, { name, artists, url })
            res.status(201).send("Track adicionada com sucesso")
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }
}
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
}
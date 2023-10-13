import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import * as data from './data'
import * as searchData from './searchData'
import * as types from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/allTracks', (req: Request, res: Response) => {
    try{
        if(data.tracks.length === 0){
            res.status(404)
            throw new Error('No tracks found')
        }
        res.status(200).send(data.tracks)
    }catch(error: any){
        res.send(error.message)
    }
})

app.get('/searchTrack/:id', (req: Request, res: Response) => {
    try{
        const track: types.Track | undefined = searchData.getTrackById(Number(req.params.id))
        
        if(!track){
            res.status(404)
            throw new Error('Track not found')
        }
        res.status(200).send(track)
    }catch(error: any){
        res.send(error.message)
    }
})

app.post('/addTrack', (req: Request, res: Response) => {
    try{
        const {id, name, artistId, url, idUserAdded} = req.body
        
        if(!id || !name || !artistId || !url || !idUserAdded){
            res.status(401)
            throw new Error('Information is missing')
        }

        const track: types.Track | undefined = searchData.getTrackById(Number(id))

        if(track){
            res.status(403)
            throw new Error('Track already exists')
        }

        const artist: types.Artist | undefined = searchData.getArtistById(Number(artistId))

        if(!artist){
            res.status(403)
            throw new Error('The artist does not exist yet, add him first')
        }

        //TODO:
        //data.tracks.push(track)
        res.status(201).send('Track added successfully')
    }catch(error: any){
        res.send(error.message)
    }
})

app.listen(3003, () => {
    console.log('Server running at http://localhost:3003')
})
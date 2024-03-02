import { Request, Response } from 'express'
import { PlaylistBusiness } from '../Business/PlaylistBusiness'

export class PlaylistController {
    constructor(private playlistBusiness: PlaylistBusiness) {}

    getAllPlaylists = async (req: Request, res: Response):Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const allPlaylists = await this.playlistBusiness.getAllPlaylists(token)
            res.status(200).send({ allPlaylists })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    getPlaylistById = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id } = req.params
            const playlistById = await this.playlistBusiness.getPlaylistById(token, id)
            res.status(200).send({ playlistById })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    getPlaylistByName = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { name } = req.params
            const playlistByname = await this.playlistBusiness.getPlaylistByName(token, name)
            res.status(200).send({ playlistByname })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    getPlaylistsByUser = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const playlistByUser = this.playlistBusiness.getPlaylistsByUser(token)
            res.status(200).send({ playlistByUser })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    addPlaylist = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { name, tracks} = req.body
            await this.playlistBusiness.addPlaylist(token, { name, tracks })
            res.status(201).send('Playlist criada com sucesso')
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    addTrackOnPlaylist = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { playlistId, trackId } = req.body
            await this.playlistBusiness.addTrackOnPlaylist(token, playlistId, trackId)
            res.status(201).send('Música adicionada com sucesso à Playlist')
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

   /* alterNamePlaylist = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { playlistId, newName } = req.query
            await this.playlistBusiness.alterNamePlaylist(token, { playlistId, newName })
            res.status(200).send('Título da Playlist atualizado com sucesso')
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    deleteTrackOnPlaylist = async (req: Request, res: Response ): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { idPlaylist, idTrack } = req.query
            await this.playlistBusiness.deleteTrackOnPlaylist(token, { idPlaylist,  idTrack})
            res.status(200).send('Música excluída da Playlist com sucesso')
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    deletePlaylist = async (req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id } = req.params
            await this.playlistBusiness.deletePlaylist(token, id)
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }*/
}
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './routes/userRouter'
import { trackRouter } from './routes/trackRouter'
import { artistRouter } from './routes/artistRouter'
import { playlistRouter } from './routes/playlistRouter'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(`Recebido ${req.method} em ${req.url}`)
    next()
})

app.use('/User/', userRouter)
app.use('/Tracks/', trackRouter)
app.use('/Artists/', artistRouter)
app.use('/Playlist/', playlistRouter)

app.all("*", (req, res) => {
    res.status(404).send(`Não encontrado: ${req.method} ${req.url}`);
})

/*app.put('/followArtist/:id', (req: Request, res: Response) => {
    try{
        const userId: number = Number(req.headers.userid)

        if(verifyUser(userId) === false){
            res.status(401).send('headers missing or invalid')
        }

        const artistId: number = Number(req.params.id)

        if(!artistId){
            res.status(401)
            throw new Error('Information is missing')
        }

        const artistIndex: number = searchData.getArtistIndexById(artistId)

        if(artistIndex === -1){
            res.status(404)
            throw new Error('Artist not found')
        }

        const userIndex: number = searchData.getUserIndexById(userId)

        if(searchData.checkFollowingOnUser(userIndex, artistId) === true){
            res.status(403)
            throw new Error('Do you already follow this artist')
        }

        data.artists[artistIndex].followers =+ 1
        data.users[userIndex].artistsFollowingId.push(artistId)
        res.status(200).send(`Are you following ${data.artists[artistIndex].name}`)

    }catch(error: any){
        res.send(error.message)
    }
})

app.post('/createPlaylist', (req: Request, res: Response) => {
    try{
        const userId: number = Number(req.headers.userid)

        if(verifyUser(userId) === false){
            res.status(401).send('headers missing or invalid')
        }

        const {id, name} = req.body

        if(!id || !name){
            res.status(401)
            throw new Error('Information is missing')
        }

        const playlist: types.Playlist | undefined = searchData.getPlaylistById(Number(id))

        if(playlist){
            res.status(403)
            throw new Error('Playlist already exists')
        }

        const playlistToCreate = {
            id: id,
            name: name,
            tracks: [],
            idUserCreated: userId
        }

        data.playlists.push(playlistToCreate)
        console.log(data.playlists)
        res.status(201).send('Playlist created successfully')

    }catch(error: any){
        res.send(error.message)
    }

})

app.put('/addTrackOnPlaylist', (req: Request, res: Response) => {
    try{
        const userId: number = Number(req.headers.userid)

        if(verifyUser(userId) === false){
            res.status(401).send('headers missing or invalid')
        }

        const {idPlaylist, idTrack} = req.query

        if(!idPlaylist || !idTrack){
            res.status(401)
            throw new Error('Information is missing')
        }

        const playlistindex: number = searchData.getPlaylistIndexById(Number(idPlaylist))

        if(playlistindex === -1){
            res.status(404)
            throw new Error('Playlist not found')
        }

        if(userId !== data.playlists[playlistindex].idUserCreated){
            res.status(403)
            throw new Error('You do not have permission to change this playlist')
        }

        const track: types.Track | undefined = searchData.getTrackById(Number(idTrack))

        if(!track){
            res.status(404)
            throw new Error('Track not found')
        }

        if(searchData.checkTracksOnPlaylist(playlistindex, Number(idTrack)) === true){
            res.status(403)
            throw new Error('Track already added on playlist')
        }

        data.playlists[playlistindex].tracks.push(Number(idTrack))
        res.status(200).send('Track added on playlist successfully')

    }catch(error: any){
        res.send(error.message)
    }
})

app.put('/deleteTrackOnPlaylist', (req: Request, res: Response) => {
    try{
        const userId: number = Number(req.headers.userid)

        if(verifyUser(userId) === false){
            res.status(401).send('headers missing or invalid')
        }

        const {idPlaylist, idTrack} = req.query

        if(!idPlaylist || !idTrack){
            res.status(401)
            throw new Error('Information is missing')
        }

        const playlistindex: number = searchData.getPlaylistIndexById(Number(idPlaylist))

        if(playlistindex === -1){
            res.status(404)
            throw new Error('Playlist not found')
        }

        if(userId !== data.playlists[playlistindex].idUserCreated){
            res.status(403)
            throw new Error('You do not have permission to change this playlist')
        }

        if(searchData.checkTracksOnPlaylist(playlistindex, Number(idTrack)) === false){
            res.status(403)
            throw new Error('Track does not exist in the playlist')
        }

        const indexFromDelete: number = data.playlists[playlistindex].tracks.indexOf(Number(idTrack))
        delete data.playlists[playlistindex].tracks[indexFromDelete]
        res.status(200).send('Track deleted on playlist successfully')

    }catch(error: any){
        res.send(error.message)
    }
})

app.put('/updateNamePlaylist', (req: Request, res: Response) => {
    try{
        const userId: number = Number(req.headers.userid)

        if(verifyUser(userId) === false){
            res.status(401).send('headers missing or invalid')
        }

        const {id, name} = req.body

        if(!id || !name){
            res.status(401)
            throw new Error('Information is missing')
        }

        const playlistIndex: number = searchData.getPlaylistIndexById(Number(id))

        if(playlistIndex === -1){
            res.status(404)
            throw new Error('Playlist not found')
        }

        const userIndex: number = searchData.getUserIndexById(userId)

        if(data.playlists[playlistIndex].idUserCreated !== data.users[userIndex].id){
            res.status(403)
            throw new Error('You do not have permission to change this playlist')
        }

        data.playlists[playlistIndex].name = name
        res.status(200).send('Name of the playlist altered successfully')

    }catch(error: any){
        res.send(error.message)
    }
})

app.delete('/deletePlaylist/:id', (req: Request, res: Response) => {
    try{
        const userId: number = Number(req.headers.userid)

        if(verifyUser(userId) === false){
            res.status(401).send('headers missing or invalid')
        }

        const id = Number(req.params.id)

        if(!id){
            res.status(401)
            throw new Error('Information is missing')
        }
        
        const playlistIndex: number = searchData.getPlaylistIndexById(id)

        if(playlistIndex === -1){
            res.status(404)
            throw new Error('Playlist not found')
        }

        const userIndex: number = searchData.getUserIndexById(userId)

        if(data.playlists[playlistIndex].idUserCreated !== data.users[userIndex].id){
            res.status(403)
            throw new Error('You do not have permission to delete this playlist')
        }
    
        delete data.playlists[playlistIndex]
        res.status(200).send('Playlist deleted successfully')
        
    }catch(error: any){
        res.send(error.message)
    }
})*/

app.listen(3003, () => {
    console.log('Server running at http://localhost:3003')
})
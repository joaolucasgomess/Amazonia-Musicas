import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import * as data from './Utils/data'
import * as searchData from './services/searchData'
import * as types from './types/types'
import { userRouter } from './routes/userRouter'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(`Recebido ${req.method} em ${req.url}`)
    next()
})

app.use('/user/', userRouter)

app.all("*", (req, res) => {
    res.status(404).send(`Não encontrado: ${req.method} ${req.url}`);
})

/*function verifyUser(id: number): boolean{
    const user: types.User | undefined = searchData.getUserById(id)

    return !user ? false : true
}

app.get('/allTracks', (req: Request, res: Response) => {
    try{
        const userId: number = Number(req.headers.userid)

        if(verifyUser(userId) === false){
            res.status(401).send('headers missing, invalid or user not found')
        }

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
        const userId: number = Number(req.headers.userid)

        if(verifyUser(userId) === false){
            res.status(401).send('headers missing or invalid')
        }

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
        const userId: number = Number(req.headers.userid)

        if(verifyUser(userId) === false){
            res.status(401).send('headers missing or invalid')
        }

        const {id, name, artistId, url, idUserAdded} = req.body
        
        if(!id || !name || !artistId || !url){
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
            res.status(300)
            throw new Error('The artist does not exist yet, add him first')
        }

        const trackToAdd: types.Track = {
            id: id,
            name: name,
            artistId: artistId,
            url: url,
            idUserAdded: userId
        }

        data.tracks.push(trackToAdd)
        res.status(201).send('Track added successfully')

    }catch(error: any){
        res.send(error.message)
    }
})

app.post('/addArtist', (req: Request, res: Response) => {
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

        const artist: types.Artist | undefined = searchData.getArtistById(Number(id))

        if(artist){
            res.status(403)
            throw new Error('Artist already exists')
        }

        const artistToAdd = {
            id: id,
            name: name,
            followers: 0
        }

        data.artists.push(artistToAdd)
        res.status(201).send('Artist added successfully')

    }catch(error: any){
        res.send(error.message)
    } 
})

app.post('/addUser', (req: Request, res: Response) => {
    try{
        const {id, userName} = req.body

        if(!id || !userName){
            res.status(401)
            throw new Error('Information is missing')
        }

        const user: types.User | undefined = searchData.getUserById(Number(id))

        if(user){
            res.status(403)
            throw new Error('User already exists')
        }

        const userToAdd: types.User = {
            id: id,
            userName: userName,
            artistsFollowingId: [] 
        }

        data.users.push(userToAdd)
        res.status(201).send('User added successfully')

    }catch(error: any){
        res.send(error.message)
    }
})

app.put('/followArtist/:id', (req: Request, res: Response) => {
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
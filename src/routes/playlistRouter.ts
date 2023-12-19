import express from 'express'
import { PlaylistController } from '../Controller/PlaylistController'
import { PlaylistBusiness } from '../Business/PlaylistBusiness'
import PlaylistData from '../Data/PlaylistData'

export const playlistRouter = express.Router()

const playlistBusiness = new PlaylistBusiness(new PlaylistData())
const playlistController = new PlaylistController(playlistBusiness)

playlistRouter.get('/allPlaylists', playlistController.getAllPlaylists)
playlistRouter.get('/:id', playlistController.getPlaylistById)
playlistRouter.get('/:name', playlistController.getPlaylistByName)
playlistRouter.get('/playlistsByUser', playlistController.getPlaylistsByUser)
playlistRouter.post('/addPlaylist', playlistController.addPlaylist)
playlistRouter.post('/addTrackOnPlaylist', playlistController.addTrackOnPlaylist)
playlistRouter.put('/alterNamePlaylist', playlistController.alterNamePlaylist)
playlistRouter.delete('/deleteTrackOnPlaylist', playlistController.deleteTrackOnPlaylist)
playlistRouter.delete('/deletePlaylist/:id', playlistController.deletePlaylist)


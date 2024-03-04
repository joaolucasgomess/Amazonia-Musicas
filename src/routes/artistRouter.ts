import express from 'express'
import { ArtistController } from '../Controller/ArtistController'
import { ArtistBusiness } from '../Business/ArtistBusiness'
import ArtistData from '../Data/ArtistData'

export const artistRouter = express.Router()

const artistBusiness = new ArtistBusiness(new ArtistData())
const artistController = new ArtistController(artistBusiness)

artistRouter.post('/addArtist', artistController.addArtist)
artistRouter.get('/:id', artistController.getArtistById)
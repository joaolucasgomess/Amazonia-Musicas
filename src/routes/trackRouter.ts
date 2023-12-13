import express from 'express'
import { TrackController } from '../Controller/TrackController'
import { TrackBusiness } from '../Business/TrackBusiness'
import TrackData from '../Data/TrackData'

export const trackRouter = express.Router()

const trackBusiness = new TrackBusiness(new TrackData())
const trackController = new TrackController(trackBusiness)

trackRouter.get('/allTracks', trackController.getAllTracks)
trackRouter.get('/searchTrack/:id', trackController.getTrackById)
trackRouter.post('/addTrack', trackController.addTrack)

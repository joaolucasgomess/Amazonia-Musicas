import express from 'express'
import { TrackController } from '../Controller/TrackController'
import { TrackBusiness } from '../Business/TrackBusiness'
import TrackData from '../Data/TrackData'

export const userRouter = express.Router()

const trackBusiness = new TrackBusiness(new TrackData())
const trackController = new TrackController(trackBusiness)

userRouter.post('/allTracks', trackController.getAllTracks)

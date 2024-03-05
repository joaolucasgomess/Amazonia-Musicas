import Artist from '../model/Artist'

export type SignupInputDTO = {
    name: string,
    email: string,
    password: string
}

export type LoginInputDTO = {
    email: string,
    password: string
}

export type AddTrackInputDTO = {
    name: string, 
    artists: string[], 
    url: string
}


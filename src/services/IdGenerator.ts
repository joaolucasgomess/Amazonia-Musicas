//import { v4 } from 'uuid'
import { uuidv7 } from "uuidv7"

export const generatedId = (): string => {
    return uuidv7()
}
import {UPDATE_NAME} from './types'

export const updateName = userName =>{
    return {
        type: UPDATE_NAME,
        payload: userName
    }
}
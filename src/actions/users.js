import {INIT_USER_INFO, UPDATE_NAME} from './types'

export const initUserInfo = userInfo => {
    return {
        type: INIT_USER_INFO,
        payload: userInfo
    }
}

export const updateName = userName => {
    return {
        type: UPDATE_NAME,
        payload: userName
    }
}
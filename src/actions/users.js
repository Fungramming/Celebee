import {INIT_USER_INFO, UPDATE_NAME, ADD_USER_INFO, ADD_USER_IDOL} from './types'

export const initUserInfo = userInfo => {
    return {
        type: INIT_USER_INFO,
        payload: userInfo
    }
}

export const addUserInfo = userInfo => {
    return {
        type: ADD_USER_INFO,
        payload: userInfo
    }
}

export const updateName = userName => {
    return {
        type: UPDATE_NAME,
        payload: userName
    }
}

export const addUserIdol = userIdol => {
    return {
        type: ADD_USER_IDOL,
        payload: userIdol
    }
}
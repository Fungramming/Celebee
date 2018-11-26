import {INIT_USER_INFO, UPDATE_USER_INFO, ADD_USER_INFO, ADD_USER_IDOL} from './types'

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

export const updateUserInfo = userInfo => {
    return {
        type: UPDATE_USER_INFO,
        payload: userInfo
    }
}

export const addUserIdol = userIdol => {
    return {
        type: ADD_USER_IDOL,
        payload: userIdol
    }
}
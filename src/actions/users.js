import {INIT_USER_INFO, UPDATE_USER_INFO, IDOL_FETCH_REQUESTED, ADD_USER_INFO, ADD_USER_IDOL, ASYNC_INIT_USER_INFO} from './types'

export const initUserInfo = userInfo => {
    return {
        type: INIT_USER_INFO,
        payload: userInfo
    }
}

export const asyncInitUserInfo = userInfo => {
    return {
        type: ASYNC_INIT_USER_INFO,
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

export const idolFetchRequest = (userIdol) => {
    return {
        type: IDOL_FETCH_REQUESTED,
        payload: userIdol
    }
}

export const addUserIdol = userIdol => {
    return {
        type: ADD_USER_IDOL,
        payload: userIdol
    }
}
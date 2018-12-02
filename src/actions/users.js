import {ASYNC_INIT_USER_INFO, INIT_USER_INFO, UPDATE_USER_INFO, ADD_USER_INFO_REQUEST, ADD_USER_INFO, ADD_USER_IDOL, FETCH_IDOL_REQUESTED} from './types'

export const asyncInitUserInfo = userInfo => {
    return {
        type: ASYNC_INIT_USER_INFO,
        payload: userInfo
    }
}

export const initUserInfo = userInfo => {
    return {
        type: INIT_USER_INFO,
        payload: userInfo
    }
}

export const addUserInfoRequest = userInfo => {
    return {
        type: ADD_USER_INFO_REQUEST,
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

export const fetchIdolRequest = (userIdol) => {
    return {
        type: FETCH_IDOL_REQUESTED,
        payload: userIdol
    }
}

export const addUserIdol = userIdol => {
    return {
        type: ADD_USER_IDOL,
        payload: userIdol
    }
}
import {ASYNC_INIT_USER_INFO, FETCH_USER_REQUEST, FETCH_USER, INIT_USER_INFO, UPDATE_USER_INFO, ADD_USER_INFO_REQUEST, ADD_USER_INFO, FETCH_IDOL_REQUEST, FETCH_IDOL} from './types'

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

export const fetchUserInfoRequest = userInfo => {
    return {
        type: FETCH_USER_REQUEST,
        payload: userInfo
    }
}

export const fetchUserInfo = userInfo => {
    return {
        type: FETCH_USER,
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
        type: FETCH_IDOL_REQUEST,
        payload: userIdol
    }
}

export const fetchIdol = userIdol => {
    return {
        type: FETCH_IDOL,
        payload: userIdol
    }
}
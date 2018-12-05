import {
    LOGOUT, 
    CHECK_USER_REQUEST,
    CHECK_USER, 
    INIT_USER_INFO,
    FETCH_USER_REQUEST, 
    FETCH_USER, 
    FETCH_IDOL_REQUEST, 
    FETCH_IDOL, 
} from './types'

export const logout = userInfo => {
    return {
        type: LOGOUT,
        payload: userInfo
    }
}

export const checkUser = userInfo => {
    return {
        type: CHECK_USER,
        payload: userInfo
    }
}
export const checkUserRequest = userInfo => {
    return {
        type: CHECK_USER_REQUEST,
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
import { UPDATE_NAME, INIT_USER_INFO } from '../actions/types'

const initialState = {
    userInfo : {
        name: '',
        email: ''
    }
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case INIT_USER_INFO:
            console.log('payload',action.payload)
            return {
                ...state,
                userInfo : action.payload
            }
        case UPDATE_NAME:
            return {
                ...state,
                userInfo: {
                    name: action.payload
                }
            }
        default:
            return state;    
    }
}

export default userReducer;
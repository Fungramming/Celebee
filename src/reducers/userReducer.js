import { UPDATE_NAME, INIT_USER_INFO } from '../actions/types'

const initialState = {
    userName: 'celebeeeee 1004'
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case INIT_USER_INFO:
            console.log(action.payload)
            return {
                ...state,
                userInfo : action.payload
            }
        case UPDATE_NAME:
            return {
                ...state,
                userName: action.payload
            }
        default:
            return state;    
    }
}

export default userReducer;
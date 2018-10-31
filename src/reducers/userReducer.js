import { UPDATE_NAME } from '../actions/types'

const initialState = {
    userName: 'celebeeeee 1004'
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_NAME:
        console.log(action.payload)
            return {
                ...state,
                userName: action.payload
            }
        default:
            return state;    
    }
}

export default userReducer;
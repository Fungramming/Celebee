import { 
    config, 
    UPDATE_NAME, 
    INIT_USER_INFO, 
    ADD_USER_INFO } from '../actions/types'

const initialState = {
    userInfo : {
        token: '',
        nickName: '',
        email: ''
    },
}

const userReducer = (state = initialState, action) => {
    console.log('action :', action);
    switch(action.type) {
        case ADD_USER_INFO:
            fetch( config + 'register/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'token': action.payload.token,
                    'nickname':  action.payload.nickName,
                    'email': action.payload.email
                }),
            })       
        case INIT_USER_INFO:
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
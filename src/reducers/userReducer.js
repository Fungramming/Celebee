import { 
    config, 
    UPDATE_NICKNAME, 
    INIT_USER_INFO, 
    ADD_USER_INFO } from '../actions/types'

const initialState = {
    userInfo : {
        token: '',
        nickname: '',
        email: ''
    },
}

const userReducer = (state = initialState, action) => {
    console.log('action :', action);
    switch(action.type) {
        case ADD_USER_INFO:
            console.log('action.payload :', action.payload);
            fetch( config + 'register/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'token': action.payload.token,
                    'nickname':  action.payload.nickname,
                    'email':  action.payload.email
                }),
            }).then((data) => {
                console.log('data :', data);
                console.log('this.props :', this.props);
            }).catch((error) => {
                console.log('error :', error);
              });          
        case INIT_USER_INFO:
            return {
                ...state,
                userInfo : action.payload
            }
        case UPDATE_NICKNAME:
            return {
                ...state,
                userInfo: {
                    nickname: action.payload
                }
            }
        default:
            return state;    
    }
}

export default userReducer;
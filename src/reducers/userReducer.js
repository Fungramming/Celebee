import { config, UPDATE_NICKNAME, INIT_USER_INFO, ADD_USER_INFO, ADD_USER_IDOL } from '../actions/types'

const initialState = {
    userInfo : {
        token: '',
        nickname: '',
        email: ''
    },
    idolToggle: true,
    followIdol: [],
    token: ''
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
                userInfo : {
                    email: action.payload.email,
                },
                token: action.payload.token
            }
        case UPDATE_NICKNAME:
            return {
                ...state,
                userInfo: {
                    nickname: action.payload
                }
            }
        case ADD_USER_IDOL:
            fetch( config + 'user/follow/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    follow: action.payload.followOrNot,
                    idol_id: action.payload.id,
                    // token: state.userInfo.token,
                    token: action.payload.token,
                }),
            }).then((data) => {
                // console.log('action.payload.id :', action.payload.id);
                console.log('ADD_USER_IDOL_DATA :', data);
                // state.followIdol.concat([...state.followIdol, action.payload.id])
                return {
                    ...state,
                    followIdol: [action.payload.id]
                }
            }).catch((error) => {
                console.log('error :', error);
            });
        default:
            return state;    
    }
}

export default userReducer;
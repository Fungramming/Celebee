import { config, UPDATE_USER_INFO, INIT_USER_INFO, ADD_USER_INFO, IDOL_FETCH_REQUESTED, ADD_USER_IDOL, ASYNC_INIT_USER_INFO } from '../actions/types'

const initialState = {
    userInfo : {
        id: '',
        nickname: '',
        email: '',
        photo: '../../../../assets/user.png',
        follow_idol_id: [],
        unfollow_idol_id: []
    },
    idolToggle: true,
    token: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        //init 할때 두가지 경우가 있음 - 초기 로그인 - 두번째 로그인  이 두가지 경우는 서로 키 개수가 다르다.    
        case INIT_USER_INFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    email: action.payload.email,
                },
                token: action.payload.token
            }
        case ASYNC_INIT_USER_INFO:
        console.log('action.payload :', action.payload);              
                return {  
                    ...state,
                    userInfo: {
                        id: action.payload.result.id,
                        nickname: action.payload.result.nickname,
                        email: action.payload.result.email,
                        photo: action.payload.result.photo,
                        follow_idol_id: action.payload.result.follow_idol_id,
                        unfollow_idol_id: action.payload.result.unfollow_idol_id
                    },
                    token: action.payload.token,
                }            
        case ADD_USER_INFO:
            fetch( config + 'register/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'token': state.token,
                    'nickname':  action.payload.nickname,
                    'email':  action.payload.email
                }),
            }).then((data) => {
                console.log('?data :', data);                
            }).catch((error) => {
                console.log('error :', error);
            });   
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    nickname: action.payload.nickname,
                    email: action.payload.email
                },
            } 
        case IDOL_FETCH_REQUESTED:            
            return {
                ...state,
            }
        case ADD_USER_IDOL:            
            return {
                ...state,
                userInfo: action.payload                       
            } 
        case UPDATE_USER_INFO:                                 
            return {
                ...state,
                userInfo: action.payload                       
            }             
        default:
            return state;    
    }
}

export default userReducer;
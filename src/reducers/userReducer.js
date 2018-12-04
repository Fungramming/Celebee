import { 
    config, 
    ASYNC_INIT_USER_INFO, 
    CHECK_USER_REQUEST, 
    CHECK_USER,
    INIT_USER_INFO,  
    FETCH_USER_REQUEST, 
    FETCH_USER, 
    FETCH_IDOL_REQUEST, 
    FETCH_IDOL, 
} from '../actions/types'

const initialState = {
    userInfo : {
        id: '',
        nickname: '',
        email: '',
        photo: '../../../assets/user.png',
        follow_idol_id: [],
        unfollow_idol_id: []
    },
    idolToggle: true,
    token: '',
    userValid: ''
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
        case CHECK_USER_REQUEST:
            return {  
                ...state,
                token: action.payload
            }
        case CHECK_USER:
            if(!action.payload.userValid){
                return {  
                    ...state,
                    userValid: action.payload.userValid,                
                }
            }
            return {  
                ...state,
                userValid: action.payload.userValid,                
                userInfo: action.payload.userInfo,
            }
        case FETCH_USER_REQUEST:
            return {
                ...state
            }
        case FETCH_USER:
            return {
                ...state,
                userInfo: action.payload   
            }     
        case FETCH_IDOL_REQUEST:            
            return {
                ...state,
            }
        case FETCH_IDOL:               
            return {
                ...state,
                userInfo: action.payload                       
            }
        default:
            return state;    
    }
}

export default userReducer;
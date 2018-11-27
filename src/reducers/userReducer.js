import { config, UPDATE_USER_INFO, INIT_USER_INFO, ADD_USER_INFO, ADD_USER_IDOL } from '../actions/types'

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
        case INIT_USER_INFO:
            return {
                ...state,
                userInfo: {
                    email: action.payload.email
                },
                token: action.payload.token
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
                console.log('data :', data);
                console.log('this.props :', this.props);
            }).catch((error) => {
                console.log('error :', error);
            });    
            return {
            ...state,
            userInfo: {
                nickname: action.payload.nickname,
                email: action.payload.email
            },
            }      
        case UPDATE_USER_INFO:
            const data = new FormData();
            data.append('token', state.token)
            data.append('nickname', action.payload.info.nickname);
            data.append('photo', {
                uri: action.payload.photo.uri,
                name: action.payload.photo.fileName,
                type: action.payload.photo.type,
            })
            console.log('form, data :', data);
            // formData.append
            fetch( config + 'user/mypage-edit/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                // body: JSON.stringify({
                //     'token': state.userInfo.token,
                //     'nickname':  action.payload.info.nickname,
                //     'photo':  action.payload.photo
                // }),
                body: data
            }).then((data) => {
                console.log('data :', data);
            }).catch((error) => {
                console.log('error :', error);
            });         
            
            return {
                ...state,
        
            }
        case ADD_USER_IDOL:
            console.log('add idol state :', state);
            fetch( config + 'user/follow/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    follow: action.payload.followOrNot,
                    idol_id: action.payload.id,
                    token: state.token,
                }),
            }).then((data) => {
                console.log('ADD_USER_IDOL_DATA :', data);
                console.log('11111state :', state);
                let userData = JSON.parse(data._bodyInit)
                let idolList = userData.result.follow_idol_id
                console.log('idolList :', idolList);
                return {
                    ...state,
                    followIdol: idolList
                }
                
            }).catch((error) => {
                console.log('error :', error);
            });
            console.log('state.followIdol :', state.followIdol);
        default:
            return state;    
    }
}

export default userReducer;
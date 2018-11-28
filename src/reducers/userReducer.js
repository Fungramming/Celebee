import { config, UPDATE_USER_INFO, INIT_USER_INFO, ADD_USER_INFO, ADD_USER_IDOL, ASYNC_INIT_USER_INFO } from '../actions/types'

const initialState = {
    userInfo : {
        id: '',
        nickname: '',
        email: '',
        photo: '../../../../assets/user.png',
        followIdol: '',
        unfollowIdol: []
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
                return {  
                    ...state,
                    userInfo: {
                        id: action.payload.result.id,
                        nickname: action.payload.result.nickname,
                        email: action.payload.result.email,
                        photo: action.payload.result.photo,
                        followIdol: action.payload.result.follow_idol_id,
                        unfollowIdol: action.payload.result.unfollow_idol_id
                    },
                    token: action.payload.token,
                    test: "test"
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

        case ADD_USER_IDOL:
        // let
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
                let result =  JSON.parse(data._bodyInit);   
                console.log('add user data :', data);  
                let followIdol = result.result.follow_idol_id           
                console.log('111followIdol :', followIdol);
                state.userInfo = {
                    ...state.userInfo,
                    followIdol : followIdol
                }
            }).catch((error) => {
                console.log('error :', error);
            });  
            return {
                ...state
            }   
        case UPDATE_USER_INFO:
            const formData = new FormData();
            formData.append('token', state.token)
            formData.append('nickname', action.payload.nickname);
            // 사진 안바꿨을때 조건 문 필요
            if(action.payload.photo){
                formData.append('photo', {
                    uri: action.payload.photo.uri,
                    name: action.payload.photo.fileName,
                    type: action.payload.photo.type,
                })
            }            

            console.log('11formData :', formData);
            // fetch( config + 'user/mypage-edit/', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'multipart/form-data',
            //     },            
            //     body: formData
            // }).then((data) => {
            //     let result =  JSON.parse(data._bodyInit);   
            //     console.log('result :', result);
            //     // state.userInfo = {
            //     //     ...state.userInfo,
            //     //     nickname: result.result.nickname,
            //     //     photo: result.result.photo
            //     // }
                
            //     // return {
            //     //     ...state,
            //     //     userInfo: {
            //     //         ...state.userInfo,
            //     //         nickname: result.result.nickname,
            //     //         photo: result.result.photo
            //     //     }
                       
            //     // } 

            // }).catch((error) => {
            //     console.log('error :', error);
            // });   
                
            fetch( config + 'user/mypage-edit/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body:formData,
            }).then((data) => {
                console.log('data :', data);
                let result =  JSON.parse(data._bodyInit); 
                state.userInfo = {
                    ...state.userInfo,
                    photo : result.result.photo
                }
                console.log('state :', state);
            }).catch((error) => {
                console.log('error :', error);
            });  
            return {
                ...state              
            }
        default:
            return state;    
    }
}

export default userReducer;
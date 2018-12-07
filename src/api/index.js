import { config } from '../actions/types'

export default Api = {
    checkUser : async (payload) => {
        console.log('checkUser - payload :', payload);
        try{
            const response = await fetch( config + 'user/mypage/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: payload.userToken,
                    nickname: payload.nickname
                }),
            })
            console.log('checj yser response :', response);
            const ok = response.ok
            if ( ok === true ) {
                let userInfo = JSON.parse(response._bodyInit)
                if(userInfo.result.photo == null){
                    userInfo.result.photo = '../../../assets/user.png'
                }
                const result = {
                    userValid: ok,
                    userInfo: userInfo.result
                }
                return result
            } else {
                const result = {
                    userValid: ok,
                    userInfo : {
                        id: '',
                        nickname: '',
                        email: '',
                        photo: '../../../assets/user.png',
                        follow_idol_id: [],
                        unfollow_idol_id: []
                    },
                }
                return result
            }
        }
        catch(e){
            
        }      
    },

    fetchUserInfo : async (payload) => {
        try{
            let responseA = await fetch( config + 'register/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'token': payload.token,
                    'nickname': payload.userInfo.nickname,
                    'email': payload.userInfo.email
                }),
            })
            let formData = new FormData();
            formData.append('token', payload.token)
            formData.append('nickname', payload.userInfo.nickname);

            // photo가 바뀌었을때 조건: photo param 추가
            if(payload.userInfo.photo.uri !== undefined){
                formData.append('photo', {
                    uri: payload.userInfo.photo.uri,
                    name: payload.userInfo.photo.name,
                    type: "image/jpeg"
                })
            }
            let responseB = await fetch( config + 'user/mypage-edit/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body:formData,
            })
            let data = JSON.parse(responseB._bodyInit)
            if(data.result.photo == null){
                data.result.photo = "../../../assets/user.png"
            }
            return data.result

        }
        catch(e){

        }
    },
    
    fetchIdol : async (payload) => {
        try{
            let response = await fetch( config + 'user/follow/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    follow: payload.follow,
                    idol_id: payload.idol_id,
                    token: payload.token
                }),
            })
            let data = JSON.parse(response._bodyInit)
            if(data.result.photo == null){
                data.result.photo = "../../../assets/user.png"
            }
            return data.result
        }
        catch(e){

        }      
    }
}
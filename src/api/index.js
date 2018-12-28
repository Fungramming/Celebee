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
                    uid: payload.uid, 
                    token: payload.accessToken
                }),
            })
            console.log('response :', response);
            const result = JSON.parse(response._bodyInit)
            if ( result.result === "fail" ) {
                console.log('2 :', 2);
                const result = {
                    userValid: false,
                    userInfo : {
                        uid: payload.uid,
                        nickname: '',
                        email: '',
                        photo: '../../../assets/user.png',
                        follow_idol_id: [],
                        unfollow_idol_id: []
                    },
                }
                return result                               
            } else {
                console.log('1 :', 1);
                let userInfo = JSON.parse(response._bodyInit)
                if(userInfo.result.photo == null){
                    userInfo.result.photo = '../../../assets/user.png'
                }
                const result = {
                    userValid: true,
                    userInfo: userInfo.result
                }
                return result
            }
        }
        catch(e){
            
        }      
    },

    fetchUserInfo : async (payload) => {
        try{

            // const headers = () => {
            //     const h = new Header();
            //     h.append('Content-type', 'application/json')


            // }

            let responseA = await fetch( config + 'register/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': "Basic " + payload.token
                    // 'Authorization': "Bearer " + payload.token
                    // 'Authorization': payload.token
                },
                body: JSON.stringify({
                    'uid': payload.userInfo.uid,
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
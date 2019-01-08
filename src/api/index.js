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
                    'token': payload.accessToken
                },
                body: JSON.stringify({
                    uid: payload.uid, 
                }),
            })
            const result = JSON.parse(response._bodyInit)
            console.log('checkUser result', result)
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
                        unfollow_idol_id: [],
                        idol_list: []
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
        
            let responseA = await fetch( config + 'register/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': payload.token
                },
                body: JSON.stringify({
                    'uid': payload.userInfo.uid,
                    'nickname': payload.userInfo.nickname,
                    'email': payload.userInfo.email
                }),
            })
            let formData = new FormData();
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
                    'token': payload.token
                },
                body:formData,
            })
    
            let responseC = await fetch( config + 'idols/', {
                method: 'GET'
            })     
            let idolList = JSON.parse(responseC._bodyInit)

            for(let i = 0; i < idolList.idols.length; i++){
                idolList.idols[i].toggle = false
            }

            let data = JSON.parse(responseB._bodyInit)
            if(data.result.photo == null){
                data.result.photo = "../../../assets/user.png"
            }

            // idolList 추가
            data.result.idol_list = idolList.idols
            
            return data.result

        }
        catch(e){

        }
    },
    
    fetchIdol : async (payload) => {
        try{
            console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&payload :', payload);
            let response = await fetch( config + 'user/follow/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': payload.token
                },
                body: JSON.stringify({
                    follow: payload.follow,
                    idol_id: payload.idol_id,
                }),
            })

            let data = JSON.parse(response._bodyInit)
            console.log('!!!data.result', data.result)

            if(data.result.photo == null){
                data.result.photo = "../../../assets/user.png"
            }

            // let idolList = []
            // let followIdol = data.result.follow_idol_id;
            // let unFollowIdol = data.result.unfollow_idol_id;

            // console.log('followIdol', followIdol)
            // console.log('unFollowIdol', unFollowIdol)

            // for(let i=0; i < followIdol.length; i++){
            //     followIdol[i].toggle = true
            // } 
            // for(let i=0; i < unFollowIdol.length; i++){
            //     unFollowIdol[i].toggle = false
            // }

            // idolList = idolList.concat(followIdol)
            // idolList = idolList.concat(unFollowIdol)
            // console.log('@@@idolList', idolList)

            // data.result.follow_idol_id = followIdol
            // data.result.unfollow_idol_id = unFollowIdol
            // data.result.idol_list = idolList
            // console.log('after data.result', data.result)
            // console.log('after idolList', idolList)
            return data.result
        }
        catch(e){

        }      
    },

    //================================= Feed
    
    fetchFeed : async (payload) => {
        try {
            console.log('@@!!!payload :', payload);
            let response = await fetch( config + 'schedules/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': payload.token
                },
                body: JSON.stringify({
                    schedule_date: payload.date,
                    index: payload.current_page
                })
            })
            let data = JSON.parse(response._bodyInit)
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@data', data)
            return data
        }
        catch(e) {
            
        }
    }
}
import { config } from '../actions/types'

export default Api = {
    checkUser : async (payload) => {
        console.log('API index - payload :', payload);
        try{
            const response = await fetch( config + 'user/mypage/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: payload
                }),
            })
            console.log('API index - response :', response);
            const ok = response.ok
            if ( ok === true ) {
                const result = {
                    userValid: ok,
                    userInfo: JSON.parse(response._bodyInit)
                }
                return result
            } else {
                const result = {
                    userValid: ok,
                    userInfo: ''
                }
                return result
            }
        }
        catch(e){
            
        }      
    },
    
    fetchUserInfo : async (payoad) => {
        // try{
        //     fetch( config + 'register/', {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             'token': state.token,
        //             'nickname':  action.payload.nickname,
        //             'email':  action.payload.email
        //         }),
        //     }).then((data) => {
        //         console.log('?data :', data);                
        //     }).catch((error) => {
        //         console.log('error :', error);
        //     });  
        //     // return data.result
        // }
        // catch(e){

        // }      
    },
    fetchIdol : async (payload) => {
        try{
            const response = await fetch( config + 'user/follow/', {
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
            const data = JSON.parse(response._bodyInit)
            return data.result
        }
        catch(e){

        }      
    }
}
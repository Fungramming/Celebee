import { config } from '../actions/types'

export default Api = {
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
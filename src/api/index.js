import { config } from '../actions/types'

export default Api = {
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
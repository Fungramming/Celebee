import { config } from '../actions/types'

export default Api = {
    fetchUserInfo : async (payload) => {
        try{
            console.log('!!!!!!@@@@@@payload :', payload);

            const formData = new FormData();
            formData.append('token', this.state.token)
            formData.append('nickname', this.state.userInfo.nickname);
            // photo가 바뀌었을때 조건: photo param 추가            
            if(this.state.userInfo.photo.uri !== undefined){
                formData.append('photo', {
                    uri: this.state.userInfo.photo.uri,
                    name: this.state.userInfo.photo.name,
                    type: "image/jpeg"
                })
            }                         

            fetch( config + 'user/mypage-edit/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body:formData,
            }).then((data) => {
                console.log('11data :', data);
                let result =  JSON.parse(data._bodyInit);  
                                   
                this.setState(prevState => ({
                    ...prevState,
                    userInfo : result.result
                }))

                Navigation.popToRoot(this.props.componentId);
                this.props.update(this.state.userInfo)

            }).catch((error) => {
                console.log('error :', error);
            });  

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
            // return data.result
        }
        catch(e){

        }      
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
import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";

import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image'
import ImageResizer from 'react-native-image-resizer';


// import { MyApp, SelectIdolScreen } from '../Navigation'


const IMAGE_PICKER_OPTIONS = {
    title: '사진 등록',
    storageOptions: {
    skipBackup: true,
    path: 'images',
    },
};

class EditMyProfile extends Component {               
    constructor(props) {
        super(props);
        // Navigation.events().bindComponent(this);  

        this.state = { 
            token: props.token,
            userInfo: props.userInfo,
            valid: {
                alertText: false,
                completeButton: false
            }
        }
    }  
        
    // navigationButtonPressed({ buttonId }) {
    //     // will be called when "buttonOne" is clicked
    //     if(buttonId == "pressComplete"){

    //         const formData = new FormData();
    //         formData.append('token', this.state.token)
    //         formData.append('nickname', this.state.userInfo.nickname);
    //         // photo가 바뀌었을때 조건: photo param 추가            
    //         if(this.state.userInfo.photo.uri !== undefined){
    //             formData.append('photo', {
    //                 uri: this.state.userInfo.photo.uri,
    //                 name: this.state.userInfo.photo.name,
    //                 type: "image/jpeg"
    //             })
    //         }                         

    //         fetch( config + 'user/mypage-edit/', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //             body:formData,
    //         }).then((data) => {
    //             console.log('11data :', data);
    //             let result =  JSON.parse(data._bodyInit);  
                                   
    //             this.setState(prevState => ({
    //                 ...prevState,
    //                 userInfo : result.result
    //             }))

    //             Navigation.popToRoot(this.props.componentId);
    //             this.props.update(this.state.userInfo)

    //         }).catch((error) => {
    //             console.log('error :', error);
    //         });            
    //     }
    // }

    componentDidMount() {
        console.log('this.state :', this.state);
    }

    onComplete() {
        // Navigation.push(this.props.componentId, {
        //     component: {
        //         name: MYPAGE_SETTING_SCREEN
        //     }
        // })
    }
     
    onEditPhoto = () => {
        var _this = this;

        ImagePicker.launchImageLibrary(IMAGE_PICKER_OPTIONS, (response) => {
            response.isVertical = true
            const { error, uri, originalRotation } = response

            if (response.didCancel) {
            console.log('User cancelled image picker');
            } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('response :', response);

                let imageUri = uri;
                let newWidth = 100;
                let newHeight = 100;    
                let compressFormat = 'JPEG'; // or 'PNG'
                let quality = 80; // out of 100                               

                ImageResizer.createResizedImage(imageUri, newWidth, newHeight, compressFormat, quality, rotation).then((resizedImageUri) => {

                    _this.setState(prevState=>({
                        ...prevState,
                        userInfo : {
                            ...prevState.userInfo,
                            photo: resizedImageUri
                        }
                    }));
                    
                }).catch((err) => {
                    // Oops, something went wrong. Check that the filename is correct and
                    // inspect err to get more details.
                });            
            }
        });
    }
    validFunc = (state) => {
        this.setState(prevState => ({
          userInfo: {
            ...prevState.userInfo,
            email : state.userInfo.email,
            nickname : state.userInfo.nickname            
          },
          valid: state.valid
        }))    
      }
  render() {
    return (      
        <View style={styles.photoBox}>
            <TouchableOpacity onPress={this.onEditPhoto.bind(this)}>
            {this.state.userInfo.photo == '../../../assets/user.png'? <FastImage
                style={styles.photo}
                source={require('../../../assets/user.png')}
                />  : <FastImage
                style={styles.photo}
                source={{uri: typeof this.state.userInfo.photo == 'object' ? this.state.userInfo.photo.uri : this.state.userInfo.photo}}
            />  }          
                <Icon style={styles.photoIcon} name="camera"></Icon>
            </TouchableOpacity>
        </View>                
    )
  }
}

const mapStateToProps = state => {
    return {      
        userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
        token: state.user.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update: (userInfo) => {
            dispatch(updateUserInfo(userInfo))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMyProfile)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fefefe",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    photoBox: {
        paddingVertical: 50,
        alignItems:'center'
    },
    photo: {
      backgroundColor: '#dedede',
      borderRadius: 28,
      marginRight: 10,
      width: 100,
      height: 100
    },
    photoIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: 25
      }   
})
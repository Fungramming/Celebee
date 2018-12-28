import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  UIManager,
  Keyboard,
  Dimensions
} from "react-native";
import { connect } from "react-redux";

import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image'
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-picker';


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

        this.state = { 
            token: props.token,
            userInfo: props.userInfo,
            imageStyle: {
                width: 100,
                height: 100,
                borderRadius: 28
            }
        }

        // if (Platform.OS === 'android') {
        //     UIManager.setLayoutAnimationEnabledExperimental(true);
        //   }

    }  

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.userInfo.photo && prevState.userInfo.photo !== this.state.userInfo.photo){
            this.props.onInitPhoto(this.state.userInfo.photo)
        }
        // if(prevProps.imageStyle.width !== this.props.imageStyle.width) {
        //     this.setState(prevState => ({
        //         ...prevState,
        //         imageStyle: this.props.imageStyle
        //     }))
        //     console.log('this.state.size :', this.state.imageStyle);
        // }

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
                let quality = 100; // out of 100                               

                ImageResizer.createResizedImage(imageUri, newWidth, newHeight, compressFormat, quality).then((resizedImageUri) => {

                    _this.setState(prevState=>({
                        ...prevState,
                        userInfo : {
                            ...prevState.userInfo,
                            photo: resizedImageUri
                        }
                    }));
                    
                    console.log('@@@@@@@@@@@@@@@@@@@@@Image this.state', _this.state)
                }).catch((err) => {
                    // Oops, something went wrong. Check that the filename is correct and
                    // inspect err to get more details.
                });            
            }
        });
    }
    validFunc = (state) => {
        this.setState(prevState => ({
            ...prevState,
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
                style={[styles.photo, this.state.imageStyle]}                
                source={require('../../../assets/user.png')}
                />  : <FastImage
                style={[styles.photo, this.state.imageStyle]}
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
        token: state.user.token,
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
        // flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    photoBox: {
        paddingVertical: 50,
        alignItems:'center'
    },
    photo: {
      backgroundColor: '#dedede',
      marginRight: 10     
    },
    photoIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: 25
      }   
})

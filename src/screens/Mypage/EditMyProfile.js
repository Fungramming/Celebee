import React, { Component } from 'react'
import {Button,Platform, Text, View, StyleSheet,TouchableOpacity, Dimensions, Image, TextInput, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { updateName } from '../../actions/users'

import NicknameInput from "../../components/Input/NicknameInput"

import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';


const options = {
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
          userInfo: this.props.userInfo,    
          valid: {
            alertText: false,
            completeButton: false
          },
          avatarSource : "https://techcrunch.com/wp-content/uploads/2018/05/snap-dollar-eyes_preview.png?w=730&crop=1"
        }
    }
    componentDidMount() {
        // this.props.navigation.setParams({ handleSubmit: this.onSubmitProfile.bind(this) });   
    }      
   
    onEditPhoto = () => {
        var _this = this;

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
            console.log('User cancelled image picker');
            } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            } else {
            const source = { uri: response.uri };
        
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
            _this.setState({
                avatarSource: source.uri,
            });
            }
        });
    }
    validFunc = (state) => {
        console.log('전달 받은 :', state);    
        
        this.setState(prevState => ({
          userInfo: {
            ...prevState.userInfo,
            email : state.userInfo.email,
            nickname : state.userInfo.nickname            
          },
          valid: state.valid
        }))    
        console.log('11111:', this.state.userInfo);
      }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.photoBox}>
            <TouchableOpacity onPress={this.onEditPhoto.bind(this)}>
                <Image
                    style={styles.photo}
                    source={{uri: this.state.avatarSource}}
                />         
                <Icon style={styles.photoIcon} name="camera"></Icon>
            </TouchableOpacity>
        </View>          
        <NicknameInput
            thisScreen = { this.constructor.name }
            title = {"닉네임"}
            onValidFunc={this.validFunc}
        ></NicknameInput>
      </View>
    )
  }
}


const mapStateToProps = state => {
    return {
        userName: state.user.userInfo.name,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update: (name) => {
            dispatch(updateName(name))
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
        fontSize: 22
      },
    nameBox: {
        paddingHorizontal: 24,
      },
    nickName: {
      fontSize: 23,
      fontWeight: 'bold'
    },
    nameInput: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 10,
        paddingLeft: 5,
        paddingBottom: 5,
        fontSize: 18,
        borderColor: 'black'
    },
    closeCircle: {
        position: "absolute",
        top: 5,
        right: 0,
        fontSize: 15
    },
    submitButton: {
        position: "absolute",
        top: -10,
        right: 0,
    }
})

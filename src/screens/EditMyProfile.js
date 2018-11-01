import React, { Component } from 'react'
import {Button,Platform, Text, View, StyleSheet,TouchableOpacity, Dimensions, Image, TextInput, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import { updateName } from '../actions/users'

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
    constructor(props){
        super(props)
        this.state = {
            userName : this.props.userName,
            avatarSource : "https://techcrunch.com/wp-content/uploads/2018/05/snap-dollar-eyes_preview.png?w=730&crop=1"
        }
    }
    
    static navigationOptions =  ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            headerRight: (
            <TouchableOpacity onPress={params.handleSubmit}>
              <View style={{ paddingHorizontal: 15 }}>
                <Icon name="setting" size={14} />
              </View>
            </TouchableOpacity>
          )
        }
    };
   
    componentDidMount() {
        this.props.navigation.setParams({ handleSubmit: this.onSubmitProfile.bind(this) });      
    }
    onSubmitProfile = () => {
        if(this.state.userName.trim() === '') {
            return;
        }
        this.props.update(this.state.userName);
        this.props.navigation.goBack()
    }
    onChangeName = (value) => {
        this.setState({
            userName: value
        })
        console.log(this.state.userName)
    }
    clearText = () => {
        this.setState({
            userName: ''
        })
        this._textInput.setNativeProps({text: ''});
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

  render() {
    return (
      <View style={{backgroundColor: '#fff', height: Dimensions.get('window').height}}>
        <View style={styles.photoBox}>
            <TouchableOpacity onPress={this.onEditPhoto.bind(this)}>
                <Image
                    style={styles.photo}
                    source={{uri: this.state.avatarSource}}
                />         
                <Icon style={styles.photoIcon} name="camera"></Icon>
            </TouchableOpacity>
        </View>  
        <View style={styles.nameBox}>
            <Text style={styles.userName}>사용자 이름</Text>
            <View>
                <TextInput 
                    ref={component => this._textInput = component}
                    style={styles.nameInput} 
                    value = { this.state.userName } 
                    onFocus = { this.onInputFocus }
                    onChangeText = {this.onChangeName}>
                </TextInput>   
                <TouchableOpacity style={styles.closeCircle} onPress={this.clearText}>
                    <Icon name="closecircleo"></Icon>
                </TouchableOpacity>     
            </View>
        </View>
        <TouchableOpacity  ref={component => this.submit = component} style={styles.submitButton} onPress={this.onSubmitProfile}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
        top: 28,
        right: 0,
        fontSize: 15
    },
    submitButton: {
        position: "absolute",
        top: -10,
        right: 0,
    }
})

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
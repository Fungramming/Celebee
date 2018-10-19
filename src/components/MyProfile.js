import React, { Component } from 'react'
import { Text,TextInput, View, StyleSheet,TouchableOpacity, Dimensions, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
// const FilePickerManager = require('NativeModules').FilePickerManager;
const options = {
  title: '사진 등록',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


export default class MyProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputNickName : "",
      avatarSource : "https://techcrunch.com/wp-content/uploads/2018/05/snap-dollar-eyes_preview.png?w=730&crop=1"
    }
  }
  _handleInputChange = (e) => {
    const {value} = e.target;
    this.setState({
      inputNickName : value
    })

  }
  _changeNickName = () => {
    alert("CHANGE NICKNAME")
  }
  _onEditPhoto = () => {
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
        alert(source.uri)
      }
    });
  }

  render() {
    return (
      <View style={styles.myProfileBox}>
        <TouchableOpacity onPress={this._onEditPhoto.bind(this)}>
          <Image
          style={styles.photo}
          source={{uri: this.state.avatarSource}}
          />         
          <Icon style={styles.photoIcon} name="camera"></Icon>
        </TouchableOpacity>
        <TextInput 
            style={styles.nickName} 
            onChangeText={()=>this._handleInputChange} 
            value={this.state.text}
            maxLength = {40}>
        </TextInput>
        <TouchableOpacity style={styles.settingBtn} onPress={()=> this._changeNickName}>
          <Icon style={styles.settingBtnIcon} name="setting"/>          
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBtn}>
          <Icon style={styles.settingBtnIcon} name="setting"/>          
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    myProfileBox:{
      paddingHorizontal: 15,
      width: Dimensions.get('window').width,
      height: 125,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems:'center'        
    },  
    photoIcon: {
      position: 'absolute',
      top: 0,
      right: 20,
      fontSize: 22
    },
    photo: {
      backgroundColor: '#dedede',
      borderRadius: 40,
      marginRight: 20,
      width: 80,
      height: 80
    },
    nickName: {
      borderColor: '#dedede',
      borderBottomWidth: 1,
      fontSize: 18,
      padding: 5,
      width: 160,
      height: 40
    },
    settingBtn: {
      marginLeft: 'auto',
    },
    settingBtnIcon: {
      fontSize: 24
    }
})
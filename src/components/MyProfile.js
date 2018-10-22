import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity, Dimensions, Image } from 'react-native'
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
      nickName : "celebee1004",
      avatarSource : "https://techcrunch.com/wp-content/uploads/2018/05/snap-dollar-eyes_preview.png?w=730&crop=1"
    }
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
        </TouchableOpacity>
        <View>
          <Text style={styles.nickName}>{this.state.nickName}</Text>
          <TouchableOpacity style={styles.settingBtn}>
            <Text>프로필 수정</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.settingBtn}>
          <Icon style={styles.settingBtnIcon} name="setting"/>          
        </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    myProfileBox:{
      paddingHorizontal: 24,
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
      borderRadius: 28,
      marginRight: 10,
      width: 74,
      height: 74
    },
    nickName: {
      padding: 5,
      width: 160,
      height: 40,
      fontSize: 25,
    },
    settingBtn: {
      padding: 5
    },
    settingBtnIcon: {
      fontSize: 24
    }
})
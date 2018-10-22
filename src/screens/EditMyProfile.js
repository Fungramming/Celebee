import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';

const options = {
    title: '사진 등록',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export default class EditMyProfile extends Component {
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
      <View>
        <View style={styles.photoBox}>
            <TouchableOpacity onPress={this._onEditPhoto.bind(this)}>
                <Image
                style={styles.photo}
                source={{uri: this.state.avatarSource}}
                />         
                <Icon style={styles.photoIcon} name="camera"></Icon>
            </TouchableOpacity>
        </View>  
        <View style={styles.nickNameBox}>
            <Text style={styles.nickName}> 사용자 이름 </Text>
            <TextInput style={styles.nickNameInput}></TextInput>        
        </View>
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
    nickNameBox: {
        paddingHorizontal: 24,
      },
    nickName: {
      fontSize: 23,
      fontWeight: 'bold'
    },
    nickNameInput: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontSize: 18
    }
})
import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'

export default class EditMyProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
          nickName : "celebee1004",
          avatarSource : "https://techcrunch.com/wp-content/uploads/2018/05/snap-dollar-eyes_preview.png?w=730&crop=1"
        }
      }
  render() {
    return (
      <View>
        <View style={styles.photoBox}>
            <Image
            style={styles.photo}
            source={{uri: this.state.avatarSource}}
            />  
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
    nickNameBox: {
        paddingHorizontal: 24,
      },
    nickName: {
      fontSize: 23,
      fontWeight: 'bold'
    },
    nickNameInput: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})
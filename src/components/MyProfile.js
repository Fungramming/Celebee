import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity, Dimensions, Image } from 'react-native'

export default class MyProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      nickName : "celebee1004",
      avatarSource : "https://techcrunch.com/wp-content/uploads/2018/05/snap-dollar-eyes_preview.png?w=730&crop=1"
    }
  }  

  render() {
    return (
      <TouchableOpacity >
      <View style={styles.myProfileBox}>
          <Image
            style={styles.photo}
            source={{uri: this.state.avatarSource}}
          />         
          <View>
            <Text style={styles.nickName}>{this.state.nickName}</Text>
              <Text style={styles.settingBtn}>프로필 수정</Text>
          </View>
          {/* <TouchableOpacity style={styles.settingBtn}>
            <Icon style={styles.settingBtnIcon} name="setting"/>          
          </TouchableOpacity> */}
      </View>
      </TouchableOpacity>
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
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import {connect} from 'react-redux'
class MyProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
        userInfo: this.props.userInfo
    }
  }  
  
  render() {
    return (
      <View style={styles.myProfileBox}>
        {this.state.userInfo.photo == '../../../../assets/user.png'? <Image
          style={styles.photo}
          source={require('../../../../assets/user.png')}
        />  : <Image
        style={styles.photo}
        source={{uri: this.state.userInfo.photo}}
      />  }   
        <View>
          <Text style={styles.nickName}>{this.state.userInfo.nickname}</Text>
          <Text style={styles.settingBtn}>프로필 수정</Text>
        </View>
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
      alignItems:'center',
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
})


const mapStateToProps = state => {
  return {      
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
  }
}

export default connect(mapStateToProps)(MyProfile)

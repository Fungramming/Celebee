import React, { Component } from 'react'
import { Text, View,StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import MyProfile from './components/MyProfile'
import MyIdol from './components/MyIdol'
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux'
import { Navigation } from 'react-native-navigation'
import {MYPAGE_EDIT_IDOL_SCREEN, MYPAGE_EDIT_PROFILE_SCREEN, MYPAGE_SETTING_SCREEN} from '../Navigation'
class MyPage extends Component {  
  constructor(props){
    super(props)
    this.state = {
      userName : this.props.userName,
    }
  }
  handleOnBack = (userName) => {
    console.log('userName :', userName);
    console.log('on!!! :');
    console.log('2his.state.userName :', this.state.userName);
    console.log('this :', this);
    // this.props.navigation
    this.setState({
      userName : userName
    })
    console.log('2his.state.userName :', this.state.userName);
  }

  onEditProfilePress() {
    Navigation.push(this.props.componentId, {
      component: {
        name: MYPAGE_EDIT_PROFILE_SCREEN
      }
    })
  }
  render() {
    return (
      <View style={styles.constainer}>
        <TouchableOpacity onPress={ this.onEditProfilePress.bind(this) }>
          <MyProfile userName={this.state.userName}></MyProfile>
        </TouchableOpacity>
        <View style={styles.idolSettingBtn}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditIdol')}>
            <Text>편집</Text>
          </TouchableOpacity>
        </View>
        <MyIdol></MyIdol>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex:1,
    alignItems: 'flex-start'
  },
  settingBtn: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  idolSettingBtn: {
    position: 'absolute',
    top: 130,
    right: 10,
    zIndex: 1
  },
  settingBtnIcon: {
    fontSize: 24
  }
})

const mapStateToProps = state => {
  
  return {
      userName: state.user.userInfo.name,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
  }
}

export default connect(mapStateToProps)(MyPage)
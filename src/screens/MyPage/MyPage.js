import React, { Component } from 'react'
import { Text, View,StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import MyProfile from './components/MyProfile'
import MyIdol from './components/MyIdol'
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux'
import { Navigation } from 'react-native-navigation'
import {MYPAGE_EDIT_IDOL_SCREEN, MYPAGE_EDIT_PROFILE_SCREEN, MYPAGE_SETTING_SCREEN} from '../Navigation'

class MyPage extends Component {  
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'My Screen'
        },
        visible: true,
        animate: false,
        rightButtons: [
          
          {
            id: 'toSettingScreen',
            icon: require('../../../assets/user.png')
          }
        ]
      }
    };
  }

  constructor(props){
    super(props);
    Navigation.events().bindComponent(this);  
  }

  navigationButtonPressed({ buttonId }) {
    // will be called when "buttonOne" is clicked
    if(buttonId == "toSettingScreen"){
      this.onSettingPress()
    }
  }

  onSettingPress() {
    Navigation.push(this.props.componentId, {
      component: {
        name: MYPAGE_SETTING_SCREEN
      }
    })
  }

  onEditProfilePress() {
    Navigation.push(this.props.componentId, {
      component: {
        name: MYPAGE_EDIT_PROFILE_SCREEN
      }
    })
  }

  onEditIdolPress() {
    Navigation.push(this.props.componentId, {
      component: {
        name: MYPAGE_EDIT_IDOL_SCREEN
      }
    })
  }
  render() {
    return (
      <View style={styles.constainer}>
        <TouchableOpacity onPress={ this.onEditProfilePress.bind(this) }>
          <MyProfile nickname={this.props.nickname}></MyProfile>
        </TouchableOpacity>
        <View style={styles.idolSettingBtn}>
          <TouchableOpacity onPress={ this.onEditIdolPress.bind(this) }>
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
  console.log('state :', state);
  return {
      nickname: state.user.userInfo.nickname,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
  }
}

export default connect(mapStateToProps)(MyPage)
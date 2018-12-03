import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Image
} from "react-native";
import { config, INIT_USER_INFO } from '../actions/types'
import {connect} from 'react-redux'
import { checkUserRequest } from "../actions/users";
import SplashScreen from 'react-native-splash-screen';
import { Navigation } from 'react-native-navigation'
import {LoginApp, MainApp} from './Navigation'
class AuthValidScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
        userValid: this.props.userValid
      }
    }
    componentDidMount() {
      SplashScreen.hide()
      this.loadApp()
    }

    componentDidUpdate(prevProps) {
      if (prevProps.userValid !== this.props.userValid ) {
        this.setState({
          userValid: this.props.userValid
        })
        if (this.props.userValid === true) {
          MainApp()
        } else {
          LoginApp()
        }
      }
    }

    // AsyncStorage에 유저토큰 값 확인 후 페이지 이동
    loadApp = async () => {
      const userToken = await AsyncStorage.getItem('userToken')
      console.log('AuTh@@@@@@@@@@@@userToken :', userToken);
      this.props.checkUserRequest(userToken)
      // console.log('userToken in AuthValid :', userToken);

      // fetch( config + 'user/mypage/', {
      //   method: 'POST',
      //   headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //       'token': userToken,
      //   }),
      // }).then((data) => {
      //   if(data.ok === true){
      //     let result = JSON.parse(data._bodyInit)
      //     // photo 값 null로 받을 시 
      //     // JSON value '<null>' of type NSNull cannot be converted to NSString
      //     // 에러 발생
      //     if(result.result.photo == null) {
      //       result.result.photo = ''
      //     }
      //     this.props.asyncInit({result: result.result, token: userToken})      
      //     MainApp()       
      //   } else if(data.ok === false) {
      //     LoginApp()
      //   }

      // }).catch((error) => {

      // });
    }
  
    render() {
      return (
          <View style={styles.container}>
              <Image 
                style={{width: 150, height: 150}}
                source={require('../../assets/logo_white.png')}>
              </Image>
              <ActivityIndicator 
                color='white'
              />
          </View>
      );
    }

}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
      userValid: state.user.userValid
  }
}

const mapDispatchToProps = dispatch => {
  return {
      // asyncInit: (userInfo) => {
      //     dispatch(asyncInitUserInfo(userInfo))
      // }
      checkUserRequest: (userInfo) => {
        dispatch(checkUserRequest(userInfo))
      }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(AuthValidScreen);

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#722784', 
  }
});
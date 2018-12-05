import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Image
} from "react-native";
import {connect} from 'react-redux'
import { checkUserRequest } from "../actions/users";
import SplashScreen from 'react-native-splash-screen';
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

    // AsyncStorage에 유저토큰 값 확인 후 유저 판별 함수 실행
    loadApp = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken') 
        console.log(' userToken != null :',  userToken !== null);
        if( userToken !== null){
          MainApp()
          this.props.checkUserRequest(userToken)
        }  else if( userToken == null ){
          LoginApp()
        } 
      } catch (e) {

      }     
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
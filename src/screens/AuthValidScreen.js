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
import { initUserInfo } from "../actions/users";
import SplashScreen from 'react-native-splash-screen';

class AuthValidScreen extends Component {

    constructor(props) {
      super(props);
      this.loadApp()
    }
    componentDidMount() {
      SplashScreen.hide();
    }

    // AsyncStorage에 유저토큰 값 확인 후 페이지 이동
    loadApp = async () => {
      const userToken = await AsyncStorage.getItem('userToken')
      console.log('userToken in AuthValid :', userToken);

      // fetch( config + 'mypage/', {
      //   method: 'POST',
      //   headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //       'token': userToken,
      //   }),
      // }).then((data) => {
      //   let result =  JSON.parse(data._bodyInit)
      //   this.props.init(result.result)

      // }).catch((error) => {
      // }); 

      this.props.navigation.navigate(userToken ? 'App' : 'Login')
    }
  
    render() {
      return (
          <View style={styles.container}>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
      init: (userInfo) => {
          dispatch(initUserInfo(userInfo))
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
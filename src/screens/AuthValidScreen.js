import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Image
} from "react-native";

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
export default AuthValidScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#722784', 
  }
});
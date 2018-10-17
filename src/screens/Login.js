import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";
import {Icon} from 'native-base';
import MainScreen from './MainScreen'
import { NativeRouter, Route, Link } from 'react-router-native'

class Login extends Component {
  
  goToMain = () => {
    this.props.navigation.navigate('Main')
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Text>로그인</Text>
          <Button title="Facebook" onPress={this.goToMain}>Facebook</Button>
          <Button title="Google" onPress={this.goToMain}>Google</Button>
          <Button title="Kakao" onPress={this.goToMain}>Kakao</Button>
        </View>
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
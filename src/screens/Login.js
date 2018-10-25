import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Container, Header, Content, Body, Icon, Button } from 'native-base';

import FBSDK, { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDI0yDEw3xg9eCQphgJbf95_RCIOPVlKH0',
  authDomain: 'celebee-a44f9.firebaseapp.com/',
  databaseURL: 'https://celebee-a44f9.firebaseio.com/'
}

const firebaseRef = firebase.initializeApp(config)

class Login extends Component {
  constructor(props) {
    super(props)
  }

  goToMain = () => {
    this.props.navigation.navigate('SelectIdol')
    // console.log('this.props.navigation.state :', this.props.navigation.state);
  }

  _fbAuth() {
    var _this = this;
    
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        }
        else {
          alert('Login success with permissions: ' + result.grantedPermissions.toString());
          console.log(result)
          // this.login();
        }
      },
      function (error) {
        alert('Login fail with error: ' + error);
      }
    ).catch((error) => console.error(error)); // error handling for promise
  }
  
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar 
          barStyle="light-content"
        />

        <View style={styles.loginTextView}>
          <Text style={styles.loginText}>로그인</Text>
        </View>

        <View style={{flex: 2}}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
          <Button full rounded primary style={styles.G_btn} onPress={() => this.goToMain()}>
            <Text style={{color:'#000', fontSize: 16}}>구글로계정으로 로그인</Text>
          </Button>
          <Button full rounded primary style={styles.K_btn} onPress={() => this.goToMain()}>
            <Text style={{color:'#000', fontSize: 16}}>카카오계정으로 로그인</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: '#722784'
  },
  loginTextView: {
    flex:4,
    alignSelf: 'stretch' ,
    marginTop: 70
  },
  loginText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  F_btn: {
    marginTop: 10,
    backgroundColor: '#365899',
    borderRadius: 8,
  },
  G_btn: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  K_btn: {
    marginTop: 10,
    backgroundColor: '#F1D905',
    borderRadius: 8,
  }
});
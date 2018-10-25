import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { Container, Header, Content, Body, Icon, Button } from 'native-base';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

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

  componentDidMount() {
    GoogleSignin.configure({
      iosClientId: '212649232198-0u4vbcte8eub8kplhil8u9svh62rrasd.apps.googleusercontent.com', // only for iOS
    })
  }

  goToMain = () => {
    this.props.navigation.navigate('SelectIdol')
    // console.log('this.props.navigation.state :', this.props.navigation.state);
  }

  _fbAuth() {
    var _this = this;
    
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function(result) {
          if (result.isCancelled) {
            // alert('Login cancelled');
          } else {

            AccessToken.getCurrentAccessToken().then((accessTokenData) => {
              
              const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
              return firebase.auth().signInAndRetrieveDataWithCredential(credential).then((result) => {
                // promise was succesful
                console.log('result :', result);
                _this.props.navigation.navigate('SelectIdol')
              }, (error) => {
                // promise was rejected
                console.log(error)
              })

              // console.log('accessTokenData :', accessTokenData);
              // _this.props.navigation.navigate('SelectIdol')

            }, (error => {
              console.log('Some error occured: ' + error);
            }))
          }
      },
      function(error) {
          alert('Login fail with error: ' + error);
      },
    );
  }
  
  _onLoginGoggle = () => {
    var _this = this;

    GoogleSignin.signIn().then((data) => {
      // create a new firebase credential with the token
      console.log('data :', data);
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      return firebase.auth().signInAndRetrieveDataWithCredential(credential)
    }).then((currentUser) => {
      // console.log(`Google Login with user : ${JSON.stringify(currentUser.toJSON())}`)
      <ActivityIndicator/>
      console.log('currentUser.credential.accessToken :', currentUser.credential.accessToken);
      console.log('currentUser :', currentUser);
      _this.props.navigation.navigate('SelectIdol')
    }).catch((error) => {
      console.log(`Login fail with error: ${error}`);
    })
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
          {/* <LoginButton
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
                      this.props.navigation.navigate('SelectIdol')
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => console.log("logout.")}/> */}
          <Button full rounded primary style={styles.F_btn} onPress={this._fbAuth.bind(this)}>
            <Text style={{color:'#fff', fontSize: 16}}>페이스북계정으로 로그인</Text>
          </Button>
          {/* <GoogleSigninButton
            style={{ height: 55 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.White}
            onPress={this._onLoginGoggle.bind(this)}
            // disabled={this.state.isSigninInProgress}
          /> */}
          <Button full rounded primary style={styles.G_btn} onPress={this._onLoginGoggle.bind(this)}>
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
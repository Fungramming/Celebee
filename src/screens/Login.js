import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import LoadingSpinner from '../components/LoadingSpinner'
import firebase from 'firebase'
import { Container, Header, Content, Body, Icon, Button } from 'native-base';
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin';

var config = {
  apiKey: "AIzaSyDI0yDEw3xg9eCQphgJbf95_RCIOPVlKH0",
  authDomain: "celebee-a44f9.firebaseapp.com",
  databaseURL: "https://celebee-a44f9.firebaseio.com",
  projectId: "celebee-a44f9",
  storageBucket: "celebee-a44f9.appspot.com",
  messagingSenderId: "212649232198"
};
firebase.initializeApp(config);

class Login extends Component {
  constructor(props) {
    super(props)
    state = { animating: true }
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['openid', 'email', 'profile'],
      shouldFetchBasicProfile: true,
      clientID: '212649232198-lbuq98lucbvt160c4ft6pkt335414srl.apps.googleusercontent.com',
      iosClientId: '212649232198-0u4vbcte8eub8kplhil8u9svh62rrasd.apps.googleusercontent.com', // only for iOS
    })
  }

  goToMain = () => {
    this.props.navigation.navigate('SelectIdol')
    // console.log('this.props.navigation.state :', this.props.navigation.state);
  }

  _fbAuth() {
    var _this = this;
    
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then(
      (result) => {
        // <ActivityIndicatorExample/> 
        if (result.isCancelled) {
          Alert.alert('Whoops!', 'You cancelled the sign in.');
        } else {
          AccessToken.getCurrentAccessToken()
            .then((data) => {
              const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
              firebase.auth().signInAndRetrieveDataWithCredential(credential)
              .then(() => {
                _this.props.navigation.navigate('SelectIdol')
                })
                .catch((error) => {
                  console.log(error.message);
                });
            });
        }
      },
      (error) => {
        Alert.alert('Sign in error', error);
      },
      function (error) {
        alert('Login fail with error: ' + error);
      }
    ).catch((error) => console.error(error)); // error handling for promise
  }
  
  _onLoginGoggle = () => {
    var _this = this;

    GoogleSignin.signIn().then((data) => {
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      return firebase.auth().signInAndRetrieveDataWithCredential(credential)
    }).then((currentUser) => {
      // console.log(`Google Login with user : ${JSON.stringify(currentUser.toJSON())}`)
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
          <Button full rounded primary style={styles.F_btn} onPress={this._fbAuth.bind(this)}>
            <Text style={{color:'#000', fontSize: 16}}>페이스북계정으로 로그인</Text>
          </Button>
          <Button full rounded primary style={styles.G_btn} onPress={this._onLoginGoggle.bind(this)}>
            <Text style={{color:'#000', fontSize: 16}}>구글계정으로 로그인</Text>
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
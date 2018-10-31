import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";

import LoadingSpinner from '../components/LoadingSpinner'
import firebase from 'firebase'
import { Container, Header, Content, Body, Icon, Button } from 'native-base';
import RNKakaoLogins from 'react-native-kakao-logins'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin';
import { connect } from "react-redux";
import { initUserInfo } from "../actions/users";

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
    state = {
      userInfo: {}, 
      animating: true 
    }
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

  initUser = (supplier, data, _this) => {
    let userInfo = {
      name: '',
      email: ''
    }
    switch(supplier){
      case "facebook":
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name &access_token=' + data)
        .then((response) => response.json())
        .then((json) => {
          userInfo.name = json.name
          userInfo.email = json.email
          this.props.init(userInfo)
          console.log('face userInfo :', userInfo);  
        })
        .catch(() => {
          reject('ERROR GETTING DATA FROM FACEBOOK')
        })      
        break;
      case "google":
        userInfo.name = data.user.name
        userInfo.email = data.user.email    
        console.log('this.props :', _this.props);
        _this.props.init(userInfo)
        console.log('google userInfo :', userInfo);  
        break;        
      case "kakao":
        userInfo.name = data.nickname
        userInfo.email = data.email_verified
        this.props.init(userInfo)
        console.log('kakao userInfo :', userInfo);  
        break;  
    }  
  }
  
  _onLoginFacebook() {
    var _this = this;
    
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
        if (result.isCancelled) {
          Alert.alert('Whoops!', 'You cancelled the sign in.');
        } else {
          AccessToken.getCurrentAccessToken()
            .then((data) => {           
              const {accessToken} = data            
              _this.initUser("facebook",accessToken)
              const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
              return firebase.auth().signInAndRetrieveDataWithCredential(credential)
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
      _this.initUser("google",data, _this)      
      return firebase.auth().signInAndRetrieveDataWithCredential(credential)
    }).then(() => {      
      _this.props.navigation.navigate('SelectIdol')
    }).catch((error) => {
      console.log(`Login fail with error: ${error}`);
    })
  }

  _onLoginKakao = () => {
    var _this = this;

    RNKakaoLogins.login((error,result) => {
      if (error) {
        // Alert.alert('error: ', error )
        console.log('error :', error);
        return
      } else {
          RNKakaoLogins.getProfile((error, result) => {
            if (error){
              console.log(error);
              return;
            }
            _this.initUser("kakao", result)
          });
      }
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

        <LoadingSpinner/>

        <View style={{flex: 2}}>
          <Button full rounded primary style={styles.F_btn} onPress={this._onLoginFacebook.bind(this)}>
            <Text style={{color:'#fff', fontSize: 16}}>페이스북계정으로 로그인</Text>
          </Button>
          <Button full rounded primary style={styles.G_btn} onPress={this._onLoginGoggle.bind(this)}>
            <Text style={{color:'#000', fontSize: 16}}>구글로계정으로 로그인</Text>
          </Button>
          <Button full rounded primary style={styles.K_btn} onPress={this._onLoginKakao.bind(this)}>         
            <Text style={{color:'#000', fontSize: 16}}>카카오계정으로 로그인</Text>
          </Button>
        </View>
        
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
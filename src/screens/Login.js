import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from "react-native";

import SplashScreen from 'react-native-splash-screen';
import AppIntroSlider from 'react-native-app-intro-slider';

import LoadingSpinner from '../components/LoadingSpinner'
import firebase from 'firebase'
import { Container, Header, Content, Body, Icon, Button } from 'native-base';
import RNKakaoLogins from 'react-native-kakao-logins'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin';

// import AuthValid from './AuthValidScreen'
// import IntroSlider from './IntroSlider'

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
    // this.loadApp()
    this.state = { 
      isLoading: false,
      showRealApp: false,
    }
  }

  componentDidMount() {
    // SplashScreen.hide();
    GoogleSignin.configure({
      scopes: ['openid', 'email', 'profile'],
      shouldFetchBasicProfile: true,
      clientID: '212649232198-lbuq98lucbvt160c4ft6pkt335414srl.apps.googleusercontent.com',
      iosClientId: '212649232198-0u4vbcte8eub8kplhil8u9svh62rrasd.apps.googleusercontent.com', // only for iOS
    })
  }

  // 유저 토근 저장 
  saveUserToken = async (data) => {
    await AsyncStorage.setItem('userToken', data)
  }

  _onLoginFacebook() {
    var _this = this;
    
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then(
      (result) => {
        if (result.isCancelled) {
          Alert.alert('Whoops!', 'You cancelled the sign in.');
        } else {
          AccessToken.getCurrentAccessToken()
          .then((data) => {
            this.setState({
              isLoading: true
            })
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            firebase.auth().signInAndRetrieveDataWithCredential(credential)
            .then(() => {
              this.setState({
                isLoading: false
              })
              _this.saveUserToken(credential.accessToken)
              // _this.saveUserToken(data.accessToken)
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
      console.log('data :', data);

      this.setState({
        isLoading: true
      })

      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      return firebase.auth().signInAndRetrieveDataWithCredential(credential)
    }).then((currentUser) => {

      this.setState({
        isLoading: false
      })

      _this.props.navigation.navigate('SelectIdol')
    }).catch((error) => {
      console.log(`Login fail with error: ${error}`);
    })
  }

  _onLoginKakao = () => {
    var _this = this;

    this.setState({
      isLoading: true
    })

    RNKakaoLogins.login((error,result) => {
      if (error) {
        console.log('error :', error);
        return
      }
      console.log('result :', result);
      _this.props.navigation.navigate('SelectIdol')
    })

  }

  render() {
      if(this.state.showRealApp) {
        return (
          <Container style={styles.container}>
            <StatusBar 
              barStyle="light-content"
            />

            <View style={styles.loginTextView}>
              <Text style={styles.loginText}>로그인</Text>
            </View>

            <LoadingSpinner 
              show={this.state.isLoading}
            />

            <View style={styles.loginButtonView}>
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
      } else {
        return (
          <AppIntroSlider
            slides={slides}
            showSkipButton={true}
            hideNextButton={true}
            onDone={() => this.setState({ showRealApp: true })}
            onSkip={() => this.setState({ showRealApp: true })}
            bottomButton
            skipLabel='시작하기'
            doneLabel='시작하기'
            buttonStyle={styles.button}
          />
        )
      }
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
    flex: 1,
    alignSelf: 'stretch' ,
    marginTop: 70
  },
  loginText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginButtonView: {
    flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 50
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
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    // borderRadius: 15
    margin: -20,
    marginTop: 0,
    marginBottom: -15,
  }
});


const slides = [
  {
      key: 's1',
      title: '셀',
      titleStyle: styles.title,
      text: '셀레비 어플입니다.',
      image: require('../../assets/logo_white.png'),
      imageStyle: styles.image,
      backgroundColor: '#722784', 
  },
  {
      key: 's2',
      title: '레',
      titleStyle: styles.title,
      text: '셀레비 어플입니다.',
      image: require('../../assets/logo_white.png'),
      imageStyle: styles.image,
      backgroundColor: '#722784',
  },
  {
      key: 's3',
      title: '비',
      titleStyle: styles.title,
      text: '셀레비 어플입니다.',
      image: require('../../assets/logo_white.png'),
      imageStyle: styles.image,
      backgroundColor: '#722784', 
  },
  {
      key: 's4',
      title: '어',
      titleStyle: styles.title,
      text: '셀레비 어플입니다.',
      image: require('../../assets/logo_white.png'),
      imageStyle: styles.image,
      backgroundColor: '#722784',
  },
  {
      key: 's5',
      title: '플',
      titleStyle: styles.title,
      text: '셀레비 어플입니다.',
      image: require('../../assets/logo_white.png'),
      imageStyle: styles.image,
      backgroundColor: '#722784',
  },
  {
      key: 's6',
      title: '!',
      titleStyle: styles.title,
      text: '셀레비 어플입니다.',
      image: require('../../assets/logo_white.png'),
      imageStyle: styles.image,
      backgroundColor: '#722784',
  },
];

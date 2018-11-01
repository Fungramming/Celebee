import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  AppRegistry,
  Dimensions,
  Image
} from "react-native";

import LoadingSpinner from '../components/LoadingSpinner'
import firebase from 'firebase'
import { Container, Header, Content, Body, Icon, Button } from 'native-base';
import RNKakaoLogins from 'react-native-kakao-logins'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin';
import { connect } from "react-redux";
import { initUserInfo } from "../actions/users";
import AppIntro from 'react-native-app-intro';

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
    this.state = {
      userInfo: {}, 
      isLoading: false,
      showRealApp: false,
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

  // 유저 토근 저장 
  saveUserToken = async (data) => {
    await AsyncStorage.setItem('userToken', data)
  }

  initUser = (supplier, data) => {
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
        })
        .catch(() => {
          reject('ERROR GETTING DATA FROM FACEBOOK')
        })      
        break;
      case "google":
        userInfo.name = data.user.name
        userInfo.email = data.user.email    
        this.props.init(userInfo)
        break;        
      case "kakao":
        userInfo.name = data.nickname
        userInfo.email = data.email_verified
        this.props.init(userInfo)
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

              this.setState({
                isLoading: true
              })

              const {accessToken} = data            
              _this.initUser("facebook",accessToken)
              const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
              return firebase.auth().signInAndRetrieveDataWithCredential(credential)
              .then(() => {

                this.setState({
                  isLoading: false
                })

                _this.saveUserToken(credential.accessToken)
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

      this.setState({
        isLoading: true
      })

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      _this.initUser("google",data)      
      return firebase.auth().signInAndRetrieveDataWithCredential(credential)
    }).then(() => { 

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
        <View>
          <AppIntro
            customStyles={{btnContainer: {padding: 120}}}
            showSkipButton= {false}
            showDoneButton= {false}>          
            <View style={styles.slide}>
              <View level={30}><Text style={[styles.text,{marginTop: -150}]}>셀</Text></View>
              <View level={20}>
                <Image
                    style={styles.image}
                    source={require('../../assets/logo_white.png')}
                />   
              </View>
              <View level={10}><Text style={[styles.text,{marginTop: 0}]}>셀레비 어플입니다.</Text></View>
            </View>
            <View style={styles.slide}>
              <View level={30}><Text style={[styles.text,{marginTop: -150}]}>레</Text></View>
              <View level={20}>
                <Image
                    style={styles.image}
                    source={require('../../assets/logo_white.png')}
                />   
              </View>
              <View level={10}><Text style={[styles.text,{marginTop: 0}]}>셀레비 어플입니다.</Text></View>
            </View>
            <View style={styles.slide}>
              <View level={30}><Text style={[styles.text,{marginTop: -150}]}>비</Text></View>
              <View level={20}>
                <Image
                    style={styles.image}
                    source={require('../../assets/logo_white.png')}
                />   
              </View>
              <View level={10}><Text style={[styles.text,{marginTop: 0}]}>셀레비 어플입니다.</Text></View>
            </View>
            <View style={styles.slide}>
              <View level={30}><Text style={[styles.text,{marginTop: -150}]}>!</Text></View>
              <View level={20}>
                <Image
                    style={styles.image}
                    source={require('../../assets/logo_white.png')}
                />   
              </View>
              <View level={10}><Text style={[styles.text,{marginTop: 0}]}>셀레비 어플입니다.</Text></View>
            </View>
          </AppIntro>
          <Button style={styles.button} onPress= {() => this.setState({ showRealApp: true })}>
            <Text style={styles.text}>시작하기</Text>
          </Button>
        </View>
      )
    }
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
  image: {
    marginTop: -70,
    marginBottom: 50,
    width: 200,
    height: 200,
  },
  loginTextView: {
    flex: 2,
    alignSelf: 'stretch' ,
    marginTop: 70
  },
  loginButtonView: {
    flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'flex-end'
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
  },
  button: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: Dimensions.get('window').width,
    // borderRadius: 15,
    marginTop: -70,
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#722784',
    padding: 15,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    
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
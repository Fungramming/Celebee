import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  AppRegistry,
  Dimensions,
  Image,
  Platform
} from "react-native";

import LoadingSpinner from '../../components/LoadingSpinner'
import firebase from 'firebase'
import RNKakaoLogins from 'react-native-kakao-logins'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin';
import { connect } from "react-redux";
import { initUserInfo, checkUserRequest } from "../../actions/users";
import AppIntro from 'react-native-app-intro';

import {MainApp, SetNicknameScreen} from '../Navigation'
import {AuthValid} from '../Navigation'


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
      userInfo: this.props.userInfo, 
      isLoading: false,
      showRealApp: false,
      userValid: this.props.userValid,
      token: this.props.token
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

  // 유저 토근 저장 / 유저 판별 후 페이지 이동

  componentDidUpdate(prevProps, prevState) {
    console.log('this.state :', this.state);
      console.log('4 prevProps.userValid :',  prevProps.userValid);
      console.log('5 this.props.userValid :', this.props.userValid);
      console.log('this.state :', this.state);
      if ( prevProps.userValid !== this.props.userValid) {
        console.log('on@@@@@@@@@@@@@@@@@@@@@@@@@@')
        this.setState(prevState=> ({
          ...prevState,
          userInfo: this.props.userInfo,
          userValid: this.props.userValid,
          token: this.props.token,
        }))
        console.log('222 :', 222);
      }      
    }

  checkUserRequest =  (token) => {
    this.props.checkUser(token)
    setTimeout(()=>{
      this.navi()
    }, 1000)
  } 

  navi = () => {
    console.log('this.props.userValid :', this.props.userValid);
    if( this.props.userValid == true){  //기존 유저
      MainApp()
    }  else if( this.props.userValid == false && this.props.userInfo.nickname === "" ){  //새로운 유저
      SetNicknameScreen()
    } 
  }

  saveUserToken = async (data) => {
      await AsyncStorage.setItem('user', JSON.stringify(data))      
  }

  initUser = (supplier, data) => {
    console.log('initdata :', data);
    switch(supplier){
      case "facebook":
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name &access_token=' + data.accessToken)
        .then((response) => response.json())
        .then((json) => {
          let fUserInfo = {}
          fUserInfo.uid = data.uid
          fUserInfo.email = json.email
          fUserInfo.token = data.accessToken
          this.props.init(fUserInfo)
        })
        .catch(() => {
          reject('ERROR GETTING DATA FROM FACEBOOK')
        })      
        break;
      case "google": 
        let gUserInfo = {}
        gUserInfo.uid = data.uid
        gUserInfo.email = data.googleEmail 
        gUserInfo.token = data.accessToken
        this.props.init(gUserInfo)
        break;        
      case "kakao":      
        let kUserInfo = {}
        kUserInfo.uid = data.uid
        kUserInfo.email = data.email
        kUserInfo.token = data.token
        console.log('kUserInfo :', kUserInfo);
        this.props.init(kUserInfo)
        break;  
    }  
  }
  
  _onLoginFacebook() {
    var _this = this;
    let accessToken;
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
        if (result.isCancelled) {
          Alert.alert('Whoops!', 'You cancelled the sign in.');
        } else {
          AccessToken.getCurrentAccessToken()
            .then((data) => {         
              console.log('face data :', data);
              
              console.log('fdata :', data);
              uid = data.userID
              accessToken = data.accessToken                                       

              this.initUser("facebook", { uid: uid, accessToken: accessToken})
              
              _this.checkUserRequest({ uid: uid, accessToken: accessToken})
              _this.saveUserToken({ uid: uid, accessToken: accessToken})

            })
            .then(() => {
              this.setState({
                isLoading: true
              })

            }).catch((error) => {
              console.log(error.message);
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
    let _this = this;
    let accessToken;
    let googleEmail;
    GoogleSignin.signIn().then((data) => {
      console.log('google data :', data);
      

      uid = data.user.id
      googleEmail = data.user.email
      accessToken = data.accessToken            
  
    }).then(() => { 
      
      _this.initUser("google",{ uid: uid, googleEmail: googleEmail, accessToken: accessToken})
      _this.checkUserRequest({ uid: uid, accessToken: accessToken})
      _this.saveUserToken({ uid: uid, accessToken: accessToken})

      this.setState({
        isLoading: true
      })

    }).catch((error) => {
      console.log(`Login fail with error: ${error}`);
    })
  }

  _onLoginKakao = () => {
    let _this = this;
    let token;
    RNKakaoLogins.login((error, result) => {
      console.log('kakao result :', result);
      token = result.token
      if (error) {
        console.log('error :', error);
        return
      } else {
          RNKakaoLogins.getProfile((error, result)=>{
            if (error) {
              console.log('error :', error);
              return
            }               
              uid = result.id
              _this.initUser("kakao", {uid: uid, accessToken: token, email: result.email})
              _this.checkUserRequest({uid: uid, accessToken: token})
              _this.saveUserToken({uid: uid, accessToken: token})
          })
        }
      this.setState({
        isLoading: true
      })
    })
  }

  render() {
    if(this.state.showRealApp) {
      return (
        <View style={styles.container}>
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
            <TouchableOpacity style={styles.F_btn} onPress={this._onLoginFacebook.bind(this)}>
              <Text style={{color:'#fff', fontSize: 16, textAlign: 'center',}}>페이스북계정으로 로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.G_btn} onPress={this._onLoginGoggle.bind(this)}>
              <Text style={{color:'#000', fontSize: 16, textAlign: 'center',}}>구글계정으로 로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.K_btn} onPress={this._onLoginKakao.bind(this)}>         
              <Text style={{color:'#000', fontSize: 16, textAlign: 'center',}}>카카오계정으로 로그인</Text>
            </TouchableOpacity>
          </View>
          
        </View>
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
                    source={require('../../../assets/logo_white.png')}
                />   
              </View>
              <View level={10}><Text style={[styles.text,{marginTop: 0}]}>셀레비 어플입니다.</Text></View>
            </View>
            <View style={styles.slide}>
              <View level={30}><Text style={[styles.text,{marginTop: -150}]}>레</Text></View>
              <View level={20}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/logo_white.png')}
                />   
              </View>
              <View level={10}><Text style={[styles.text,{marginTop: 0}]}>셀레비 어플입니다.</Text></View>
            </View>
            <View style={styles.slide}>
              <View level={30}><Text style={[styles.text,{marginTop: -150}]}>비</Text></View>
              <View level={20}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/logo_white.png')}
                />   
              </View>
              <View level={10}><Text style={[styles.text,{marginTop: 0}]}>셀레비 어플입니다.</Text></View>
            </View>
            <View style={styles.slide}>
              <View level={30}><Text style={[styles.text,{marginTop: -150}]}>!</Text></View>
              <View level={20}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/logo_white.png')}
                />   
              </View>
              <View level={10}><Text style={[styles.text,{marginTop: 0}]}>셀레비 어플입니다.</Text></View>
            </View>
          </AppIntro>
          <TouchableOpacity style={styles.button} onPress= {() => this.setState({ showRealApp: true })}>
            <Text style={styles.text}>시작하기</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
      userValid: state.user.userValid,
      token: state.user.token
  }
}
const mapDispatchToProps = dispatch => {
  return {
    init: (userInfo) => {
      dispatch(initUserInfo(userInfo))
    },
    checkUser: (userInfo) => {
      dispatch(checkUserRequest(userInfo))
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
    flex: 1,
    alignSelf: 'stretch' ,
    marginTop: 70
  },
  loginButtonView: {
    flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 50
  },
  loginText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  F_btn: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    marginTop: 10,
    backgroundColor: '#365899',
    borderRadius: 6,
  },
  G_btn: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  K_btn: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    marginTop: 10,
    backgroundColor: '#F1D905',
    borderRadius: 6,
  },
  button: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginTop: -70,
      },
      android: {
        marginTop: -100,
      },
    }),
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
    padding: 25
  }
});

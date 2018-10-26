import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Container, Header, Content, Body, Icon, Button } from 'native-base';

import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import firebase from 'firebase'

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
    
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function(result) {
          if (result.isCancelled) {
            // alert('Login cancelled');
          } else {

            AccessToken.getCurrentAccessToken().then((accessTokenData) => {
              const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
              firebase.auth().signInAndRetrieveDataWithCredential(credential).then((result) => {
                // promise was succesful
                _this.props.navigation.navigate('SelectIdol')
              }, (error) => {
                // promise was rejected
                console.log(error)
              })
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
            <Text style={{color:'#fff', fontSize: 16}}>페이스북계정으로 로그인</Text>
          </Button>
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
const FBSDK = require('react-native-fbsdk');
const {LoginButton, ShareDialog} = FBSDK;

import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { Container, Header, Content, Body, Icon, Button } from 'native-base';

class Login extends Component {
  
  constructor(props) {
    super(props);
    const shareLinkContent = {
    contentType: 'link',
    contentUrl: 'https://www.facebook.com/',
    };

    this.state = {
    shareLinkContent: shareLinkContent,
    };
  }

  shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent)
    .then(function(canShow) {
        if (canShow) {
        return ShareDialog.show(tmp.state.shareLinkContent);
        }
    })
    .then(
        function(result) {
        if (result.isCancelled) {
            alert('Share cancelled');
        } else {
            alert('Share success with postId: ' + result.postId);
        }
        },
        function(error) {
        alert('Share fail with error: ' + error);
        },
    );
  }

  goToMain = () => {
    this.props.navigation.navigate('SelectIdol')
    // console.log('this.props.navigation.state :', this.props.navigation.state);
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
          <View style={styles.container}>
            <LoginButton />
            <TouchableHighlight
            style={styles.share}
            onPress={this.shareLinkWithShareDialog.bind(this)}>
            <Text style={styles.shareText}>Share link with ShareDialog</Text>
            </TouchableHighlight>
          </View>
          {/* <Button full rounded primary style={styles.F_btn} onPress={() => this.goToMain()}>
            <Text style={{color:'#fff', fontSize: 16}}>페이스북계정으로 로그인</Text>
          </Button> */}
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
    borderRadius: 15,
  },
  G_btn: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  K_btn: {
    marginTop: 10,
    backgroundColor: '#F1D905',
    borderRadius: 15,
  }
});
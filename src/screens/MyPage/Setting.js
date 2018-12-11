import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  AsyncStorage
} from "react-native";
// import {AuthValid} from '../Navigation'
import {LoginApp} from '../Navigation'
import { connect } from "react-redux";
import { logout, initUserInfo, checkUserRequest } from "../../actions/users";
import firebase from 'firebase'

import RNRestart from 'react-native-restart'; // Import package from node modules
 
// Immediately reload the React Native Bundle

class Setting extends Component {
  // static navigationOptions = {
  //   headerTitle: '환경설정'
  // }

  signOut = () => {
    this.props.logout()
    AsyncStorage.clear()
    LoginApp()
    // RNRestart.Restart();

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Setting</Text>
        <TouchableOpacity >
          <Button title="로그아웃" onPress={this.signOut}/>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
      token: state.user.token,
      userValid: state.user.userValid,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: (userInfo) => {
      dispatch(logout(userInfo))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
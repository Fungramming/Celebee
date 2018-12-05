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

class Setting extends Component {
  // static navigationOptions = {
  //   headerTitle: '환경설정'
  // }

  signOut = async () => {
    AsyncStorage.clear()
    this.props.logout()
    LoginApp()
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
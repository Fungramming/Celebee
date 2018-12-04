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
import { initUserInfo, checkUserRequest } from "../../actions/users";

class Setting extends Component {
  // static navigationOptions = {
  //   headerTitle: '환경설정'
  // }

  signOut = async () => {
    AsyncStorage.clear()
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
export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
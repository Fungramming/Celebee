import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  AsyncStorage
} from "react-native";

class Setting extends Component {
  // static navigationOptions = {
  //   headerTitle: '환경설정'
  // }

  signOut = async () => {
    AsyncStorage.clear()
    this.props.navigation.navigate('Logout')
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Text>Setting</Text>
        <Text onPress={this.signOut}>로그아웃</Text>
      </TouchableOpacity>
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
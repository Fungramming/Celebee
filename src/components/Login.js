import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";
import {Icon} from 'native-base';
import MainScreen from './MainScreen'

// const MyRouter = {
//   getStateForAction: (action, state) => ({}),
//   getActionForPathAndParams: (path, params) => null,
//   getPathAndParamsForState: (state) => null,
//   getComponentForState: (state) => MyScreen,
//   getComponentForRouteName: (routeName) => MyScreen,
// };

class Login extends Component {

  static navigationOptions = ({navigation}) => {
    header: null
  }
  
  // static router = MyRouter;

  render() {
    return (
      <View style={styles.container}>
        <Text>로그인 페이지</Text>
        {/* <Icon name="ios-person" title="페이스북">페이스북</Icon>
        <Icon name="ios-person" title="구글">구글</Icon>
        <Icon name="ios-person" title="카카오톡">카카오톡</Icon> */}
        <Icon name="ios-person" onPress={() => this.props.navigation.native('Home')}title="페이스북">페이스북</Icon>
        <Icon name="ios-person" onPress={() => this.props.navigation.native('Home')}title="구글">구글</Icon>
        <Icon name="ios-person" onPress={() => this.props.navigation.native('Home')}title="카카오톡">카카오톡</Icon>
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
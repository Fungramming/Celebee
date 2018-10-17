import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';

class MyPage extends Component {
  static navigationOptions = {
    title: '마이페이지',
    tabIcon: () => {
      <Icon name="ios-person" size={30} />
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>MyPage</Text>
      </View>
    );
  }
}
export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
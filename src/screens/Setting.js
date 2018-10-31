import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

class Setting extends Component {
  // static navigationOptions = {
  //   headerTitle: '환경설정'
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>Setting</Text>
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
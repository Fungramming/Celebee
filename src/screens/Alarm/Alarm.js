import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

class Alarm extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>알림</Text>
      </View>
    );
  }
}


export default Alarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
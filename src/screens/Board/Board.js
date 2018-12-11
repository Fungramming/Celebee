import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

class Board extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Board</Text>
      </View>
    );
  }
}


export default Board;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
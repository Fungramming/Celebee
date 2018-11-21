import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

class News extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>News</Text>
      </View>
    );
  }
}


export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
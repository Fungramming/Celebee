import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

class Search extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>검색</Text>
      </View>
    );
  }
}


export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
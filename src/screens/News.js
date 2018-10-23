import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';

class News extends Component {

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text>News</Text>
        </View>
      </Container>
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
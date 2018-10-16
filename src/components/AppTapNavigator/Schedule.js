import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';


class Schedule extends Component {
  static navigationOptions = {
    title: '스케쥴',
    tabIcon: ({tintColor}) => {
      <Icon name="ios-person" size={30} style={{color: tintColor}} />
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Schedule</Text>
      </View>
    );
  }
}
export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
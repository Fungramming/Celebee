import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

class Schedule extends Component {
  static options(passProps) {
    return {
      topBar: {
        rightButtons: {
          id: 'buttonOne',
          // icon: require('../../../assets/user.png'),
          backButton: { color: '#000', icon: require('../../../assets/user.png') },
          disableIconTint: false,
          buttonColor: '#000'
        },
        statusBarStyle: 'light'
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>스케쥴</Text>
      </View>
    );
  }
}
export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
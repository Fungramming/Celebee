/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Mypage from './src/screens/MyPage'

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar 
          barStyle="dark-content"
          backgroundColor="#f2f2f2"
        />
        <Mypage></Mypage>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#722784',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

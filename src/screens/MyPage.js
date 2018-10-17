import React, { Component } from 'react'
import { Text, View,StyleSheet, Dimensions } from 'react-native'
import MyProfile from '../components/MyProfile'
import MyIdol from '../components/MyIdol'


export default class MyPage extends Component {

  render() {
    return (
      <View style={styles.constainer}>
        <MyProfile></MyProfile>
        <MyIdol></MyIdol>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex:1,
    alignItems: 'flex-start'
  }
})
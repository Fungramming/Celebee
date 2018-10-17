import React, { Component } from 'react'
import { Text, View,StyleSheet, Dimensions } from 'react-native'
import MyProfile from '../MyProfile'


export default class MyPage extends Component {

  render() {
    return (
      <View style={styles.constainer}>
        <MyProfile></MyProfile>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  constainer: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingTop: 10,
    flex:1,
    alignItems: 'flex-start'
  }
})
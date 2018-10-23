import React, { Component } from 'react'
import { View, Dimensions,StyleSheet } from 'react-native'

export default class Devider extends Component {
  render() {
    return (
        <View
        style={{
            paddingHorizontal:15,
            width:Dimensions.get('window').width,            
        }}
      >
        <View style={{
            height: StyleSheet.hairlineWidth,
            backgroundColor: 'black'}
        }/>
      </View>
    )
  }
}

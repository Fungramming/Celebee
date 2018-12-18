import React, { Component } from 'react'
import { Text, View, WebView } from 'react-native'

export default class LinkView extends Component {
  render() {
    console.log('this.props :', this.props);
    return (
      <View>
        <Text> LinkView </Text>
      </View>
    )
  }
}

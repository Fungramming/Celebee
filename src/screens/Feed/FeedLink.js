import React, { Component } from 'react'
import { Text, View, WebView } from 'react-native'

export default class LinkView extends Component {

  onPressLike() {
    console.log('onPressLike')
  }

  onPressShare() {
    console.log('onPressShare')
  }

  onPressSave() {
    console.log('onPressSave')
  }

  onPressComment() {
    console.log('onPressComment')
  }

  render() {
    console.log('url this.props :', this.props);
    return (
      <WebView
      source={{uri: this.props.url}}
    />
    )
  }
}

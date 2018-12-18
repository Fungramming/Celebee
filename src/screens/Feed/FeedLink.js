import React, { Component } from 'react'
import { Text, View, WebView } from 'react-native'

export default class LinkView extends Component {
  render() {
    console.log('url this.props :', this.props);
    return (
      <WebView
      source={{uri: this.props.url}}
      style={{marginTop: 20}}
    />
    )
  }
}

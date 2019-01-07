import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'

import { SEARCH_SCREEN } from '../../screens/Navigation'

export default class SearchButton extends Component {

  constructor(props) {
    super(props);
    this.onPressSearch = this.onPressSearch.bind(this)
  }

  onPressSearch() {
    Navigation.push(this.props.componentId, {
      component: {  
        name: SEARCH_SCREEN,                
      },     
    })  
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPressSearch}>
          <Image style={{marginLeft: 10}} 
            source={require('../../../assets/search.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

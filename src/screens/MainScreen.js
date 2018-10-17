import React, { Component } from "react";
import { 
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';
import {NativeRouter, Switch, Route} from 'react-router-native'
import MyPageTab from './MyPage'

class MainScreen extends Component {
  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
      <NativeRouter>
        <Container>
          <Header style={{backgroundColor:"#eeeeee"}}>
            <Left>
              <TouchableOpacity>
                <Icon name="ios-person" android="md-person"  style={{paddingLeft: 10}} onPress={() => this.props.navigation.navigate('MyPageTab')} />
              </TouchableOpacity>
            </Left>
            <Body><Text>Celebee</Text></Body>
            <Right>
              <TouchableOpacity>
                <Icon name="ios-send" android="md-send" style={{paddingRight: 3}}/>
              </TouchableOpacity>
            </Right>
          </Header>
          <MyPageTab></MyPageTab>
        </Container>
      </NativeRouter>
    );
  }
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
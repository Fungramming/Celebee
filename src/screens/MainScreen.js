import React, { Component } from "react";
import { 
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';

import Home from './Home'
import Schedule from './Schedule'
import MyPage from './MyPage'
import BottomNavigation from '../BottomNavigation'

// import {NativeRouter, Switch, Route} from 'react-router-native'
// import {createMaterialTopTabNavigator} from 'react-navigation';
// import {createBottomTabNavigator} from 'react-navigation';
class MainScreen extends Component {
  goToMyPage = () => {
    this.props.navigation.navigate('MyPage')
  }

  static navigationOptions = {
    headerLeft: 
    <TouchableOpacity onPress={this.goToMyPage}>
      <Icon name="ios-person" style={{paddingLeft: 24}} />
    </TouchableOpacity>,
    title: 'Celebee',
    headerRight: 
    <TouchableOpacity>
      <Icon name="ios-send" style={{paddingRight: 24}}/>
    </TouchableOpacity>,
  }

  render() {
    return (
      <Container>
        <StatusBar 
          barStyle="dark-content"
          backgroundColor="#f2f2f2"
        />
        {/* <Header>
          <Left>
            <TouchableOpacity>
              <Icon name="ios-person" style={{paddingLeft: 10}} />
            </TouchableOpacity>
          </Left>
          <Body><Text>Celebee</Text></Body>
          <Right>
            <TouchableOpacity>
              <Icon name="ios-send" style={{paddingRight: 10}}/>
            </TouchableOpacity>
          </Right>
        </Header> */}
        <BottomNavigation />
      </Container>
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
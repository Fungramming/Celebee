import React, { Component } from "react";
import { 
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";

import Home from './AppTapNavigator/Home'
import Schedule from './AppTapNavigator/Schedule'
import MyPage from './AppTapNavigator/MyPage'
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';

import {createMaterialTopTabNavigator} from 'react-navigation'

class MainScreen extends Component {
  static navigationOptions = {
    header: null
  }
  
  render() {
    return (      
      <Container>
        <Header backgroundColor="#eeeeee">
          <Left>
            <TouchableOpacity>
              <Icon name="md-person" style={{paddingLeft: 10}} onPress={() => this.props.navigation.navigate('MyPageTab')} />
            </TouchableOpacity>
          </Left>
          <Body><Text>Celebee</Text></Body>
          <Right>
            <TouchableOpacity>
              <Icon name="md-send" style={{paddingRight: 10}}/>
            </TouchableOpacity>
          </Right>
        </Header>
        {/* <AppTabNavigator /> */}
        <MyPage></MyPage>
      </Container>
    );
  }
}

const AppTabNavigator =  createMaterialTopTabNavigator({
  HomeTab: {
    screen: Home
  },
  ScheduleTab: {
    screen: Schedule
  },
  MyPageTab: {
    screen: MyPage
  },
}, {
  // animationEnable: true,
  // swipeEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      height: 65,
      backgroundColor: '#f2f2f2',
      ...Platform.select({
        android:{
          backgroundColor: 'white'
        }
      })
    },
    indicatorStyle: {
      height: 0,
    },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    showLabel: true,
    showIcon: true
  }
})

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Container, Content, Thumbnail, Header, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

import MyPage from '../screens/MyPage'
import {createStackNavigator} from 'react-navigation';

class TopNaviBar extends Component {
  goToMyPage = () => {
    // this.props.navigation.navigate('MyPage')
    alert('mypage')
  }
  
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <TouchableOpacity onPress={this.goToMyPage}>
              <Icon name="user" size={25} style={{paddingLeft: 20}} />
            </TouchableOpacity>
          </Left>
          <Right>
            <TouchableOpacity onPress={this.goToMyPage}>
              <Icon name="user" size={25} style={{paddingRight: 20}} />
            </TouchableOpacity>
          </Right>
        </Header>
      </Container>
    );
  }
}
export default TopNaviBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    height: 50
  }
});

const goToMyPage = createStackNavigator({
  MyPage: {
    screen: MyPage,
  },
});
import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';
import TopBar from '../components/TopBar'
import {createMaterialTopTabNavigator} from 'react-navigation';
import MyPage from './MyPage'

class MypageIcon extends Component {
  goToMyPage = () => {
    this.props.navigation.navigate('MyPage')
    alert('mypage')
  }
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity 
        // onPress={() => navigate('MyPage')}
      >
        <Icon name="user" size={25} style={{paddingLeft: 24}} />
      </TouchableOpacity>
    )
  }
}

class Schedule extends Component {
  // static navigationOptions = {
  //   title: '스케쥴',
  //   tabIcon: ({tintColor}) => {
  //     <Icon name="ios-person" size={30} style={{color: tintColor}} />
  //   }
  // }
  render() {
    return (
      <View style={styles.container}>
        <TopBar />
        {/* <TopTab /> */}
        {/* <MypageIcon/> */}
      </View>
    );
  }
}
export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});

const TopTab = createMaterialTopTabNavigator({
  // News: {
  //   screen: News,
  //   navigationOptions: {
  //     tabBarLabel: 'News',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="ios-search" color={tintColor} size={24}/>
  //     )
  //   }
  // },
  Schedule: {
    screen: Schedule,
    navigationOptions: {
      tabBarLabel: 'Schedule',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-heart" color={tintColor} size={24}/>
      )
    }
  },
  // MyPage: {
  //   screen: MyPage,
  //   navigationOptions: {
  //     tabBarLabel: 'MyPage',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="ios-heart" color={tintColor} size={24}/>
  //     )
  //   }
  // },
}, {
  // animationEnable: true,
  // swipeEnabled: true,
  // tabBarPosition: 'bottom',
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
  },
})
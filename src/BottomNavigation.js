import React, {Component} from 'react';
import {Platform, Text, View, StyleSheet, Image} from 'react-native';
// import {Icon} from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign';
import {createBottomTabNavigator} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Login from './screens/Login'
import News from './screens/News'
import Schedule from './screens/Schedule'
import MyPage from './screens/MyPage'


export default createBottomTabNavigator({
  Schedule: {
    screen: Schedule,
    navigationOptions: {
      tabBarLabel: '스케줄',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="calendar" size={30} color={tintColor}/>
      )
    }
  },
  News: {
    screen: News,
    navigationOptions: {
      tabBarLabel: '뉴스',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="filetext1" color={tintColor} size={24}/>
      )
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: 'MyPage',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" color={tintColor} size={24}/>
      )
    }
  },
},{
  tabBarOptions: {
    activeTintColor: '#722784',
    inactiveTintColor: '#d1cece',
    style: {
      height: 55,
      backgroundColor: '#f2f2f2',
      borderTopWidth: 0,
      shadowOffset: {width: 5, height: 3},
      shadowColor: 'black',
      shadowOpacity: 0.5,
      elevation: 5
    }
  }
})

// export default createMaterialTopTabNavigator({
//   News: {
//     screen: News,
//     navigationOptions: {
//       tabBarLabel: 'News',
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="ios-search" color={tintColor} size={24}/>
//       )
//     }
//   },
//   Schedule: {
//     screen: Schedule,
//     navigationOptions: {
//       tabBarLabel: 'Schedule',
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="ios-heart" color={tintColor} size={24}/>
//       )
//     }
//   },
//   MyPage: {
//     screen: MyPage,
//     navigationOptions: {
//       tabBarLabel: 'MyPage',
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="ios-heart" color={tintColor} size={24}/>
//       )
//     }
//   },
// }, {
//   // animationEnable: true,
//   // swipeEnabled: true,
//   tabBarPosition: 'bottom',
//   tabBarOptions: {
//     style: {
//       height: 65,
//       backgroundColor: '#f2f2f2',
//       ...Platform.select({
//         android:{
//           backgroundColor: 'white'
//         }
//       })
//     },
//     indicatorStyle: {
//       height: 0,
//     },
//     activeTintColor: '#000',
//     inactiveTintColor: '#d1cece',
//     showLabel: true,
//     showIcon: true
//   },
// })
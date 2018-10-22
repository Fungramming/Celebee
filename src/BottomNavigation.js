import React, {Component} from 'react';
import {Platform, Text, View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {createBottomTabNavigator} from 'react-navigation';
import News from './screens/News'
import Schedule from './screens/Schedule'


export default createBottomTabNavigator({
  Schedule: {
    screen: Schedule,
    navigationOptions: {
      initialRouteName: '스케쥴',
      tabBarLabel: '스케줄',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="calendar" size={30} color={tintColor}/>
      )
    }
  },
  News: {
    screen: News,
    navigationOptions: {
      initialRouteName: '뉴스',
      tabBarLabel: '뉴스',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="filetext1" color={tintColor} size={24}/>
      )
    }
  },
  
},{
  tabBarOptions: {
    header: null,
    activeTintColor: '#722784',
    inactiveTintColor: '#d1cece',
    style: {
      height: 65,
      backgroundColor: '#f2f2f2',
      borderTopWidth: 0,
      shadowOffset: {width: 5, height: 3},
      shadowColor: 'black',
      shadowOpacity: 0.5,
      elevation: 5
    }
  }
})
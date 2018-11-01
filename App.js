import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'
import {
  Platform, 
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  Button
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import {createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator} from 'react-navigation';
import AuthValid from './src/screens/AuthValidScreen'
import Login from './src/screens/Login'
import MyPage from './src/screens/MyPage'
import SelectIdol from './src/screens/SelectIdol'
import BottomNavigation from './src/BottomNavigation'
import EditMyProfile from './src/screens/EditMyProfile'
import EditIdol from './src/screens/EditIdol'
import Setting from './src/screens/Setting'

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: BottomNavigation,
    navigationOptions: ({ navigation }) => ({
      // header: null
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('MyPage')}> */}
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="user" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: ({ navigation }) => ({
      // header: null
      // headerTitle: navigation.state.routeName,
      headerTitle: '마이페이지',
      headerStyle: {
        // marginHorizontal: 25
      },
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="setting" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  },
  EditMyProfile: 
  {
    screen: EditMyProfile,    
  },
  EditIdol: {
    screen: EditIdol,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <TouchableOpacity>
          <Button title="완료" style={{ paddingHorizontal: 10 }} onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      )
    })
  },
  Setting: {
    screen: Setting,
    navigationOptions: ({ navigation }) => ({
      headerTitle: '환경설정',
      headerRight: (
        <TouchableOpacity>
          <Button title="완료" style={{ paddingHorizontal: 10 }} onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      )
    })
  },
});

export default AppSwichNavigator = createSwitchNavigator({
  AuthValid: AuthValid,
  Login: Login,
  SelectIdol: SelectIdol,
  App: AppStackNavigator,
})

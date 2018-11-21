// import {Navigation} from 'react-native-navigation';
// import {Provider} from 'react-redux'

// import configureStore from '../../store'

// const store = configureStore()

// export function registerScreens() {
//     // Navigation.registerComponentWithRedux('Initializing', () => require('./Initializing').default, Provider, store);
//     Navigation.registerComponent('Initializing', () => require('./Initializing').default)
//     Navigation.registerComponentWithRedux('Login', () => require('./Login').default, Provider, store);
//     // Navigation.registerComponent('Login', () => require('./Login').default);git
//     Navigation.registerComponent('Schedule', () => require('./Schedule').default);
//     Navigation.registerComponent('News', () => require('./News').default);
//     Navigation.registerComponent('SelectIdol', () => require('./SelectIdol').default);
//     Navigation.registerComponentWithRedux('SetNickname', () => require('./SetNickname').default, Provider, store);
// }

import { StatusBar } from 'react-native'
import {Navigation} from 'react-native-navigation';

import Login from './Login'
import Auth from './AuthValidScreen'

// 스크린 이름 및 const 정의
export const AUTH_SCREEN = 'Celebee.AuthScreen';
export const LOGIN_SCREEN = 'Celebee.LoginScreen';

// Screens Map() 함수
export const Screens = new Map();
Screens.set(AUTH_SCREEN, Auth)
Screens.set(LOGIN_SCREEN, Login)

// LoginApp 네비게이션 함수 정의
export const AuthValid = () => Navigation.setRoot({
  root: {
    component: {
      name: AUTH_SCREEN,
      passProps: {
        text: 'Login screen'
      },
      // options: {
      //   topBar: {
      //     title: {
      //       text: 'Login'
      //     }
      //   }
      // }
    }
  }
});

export const LoginApp = () => Navigation.setRoot({
  root: {
    component: {
      name: LOGIN_SCREEN,
      passProps: {
        text: 'Login screen'
      },
      // options: {
      //   topBar: {
      //     title: {
      //       text: 'Login'
      //     }
      //   }
      // }
    }
  }
});

// MainApp 네비게이션 함수 정의
export const MainApp = () => {

}


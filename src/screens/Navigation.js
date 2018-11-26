import { StatusBar } from 'react-native'
import {Navigation} from 'react-native-navigation';

import Login from './Login/Login'
import Auth from './AuthValidScreen'
import SetNickname from './InitProfile/SetNickname'
import SelectIdol from './InitProfile/SelectIdol'
import Schedulue from './Schedule/Schedule'
import News from './News/News'
import Search from './Search/Search.js'
import MyPage from './MyPage/MyPage' 
import EditIdol from './MyPage/EditIdol' 
import EditMyProfile from './MyPage/EditMyProfile' 
import Setting from './MyPage/Setting' 

// 스크린 이름 및 const 정의
export const AUTH_SCREEN = 'Celebee.AuthScreen';
export const LOGIN_SCREEN = 'Celebee.LoginScreen';
export const SET_NICKNAME_SCREEN = 'Celebee.NicknameScreen';
export const SELECT_IDOL_SCREEN = 'Celebee.IdolScreen';
export const SCHEDULE_SCREEN = 'Celebee.ScheduleScreen';
export const NEWS_SCREEN = 'Celebee.NewsScreen';
export const SEARCH_SCREEN = 'Celebee.SearchScreen';
export const MYPAGE_SCREEN = 'Celebee.MyPageScreen';
export const MYPAGE_EDIT_IDOL_SCREEN = 'Celebee.MyPageEditIdolScreen';
export const MYPAGE_EDIT_PROFILE_SCREEN = 'Celebee.MyPageEditProfileScreen';
export const MYPAGE_SETTING_SCREEN = 'Celebee.MyPageSettingScreen';

// Screens Map() 함수
export const Screens = new Map();
Screens.set(AUTH_SCREEN, Auth)
Screens.set(LOGIN_SCREEN, Login)
Screens.set(SET_NICKNAME_SCREEN, SetNickname)
Screens.set(SELECT_IDOL_SCREEN, SelectIdol)
Screens.set(SCHEDULE_SCREEN, Schedulue)
Screens.set(NEWS_SCREEN, News)
Screens.set(SEARCH_SCREEN, Search)
Screens.set(MYPAGE_SCREEN, MyPage)
Screens.set(MYPAGE_EDIT_IDOL_SCREEN, EditIdol)
Screens.set(MYPAGE_EDIT_PROFILE_SCREEN, EditMyProfile)
Screens.set(MYPAGE_SETTING_SCREEN, Setting)

// LoginApp 네비게이션 함수 정의
export const AuthValid = () => Navigation.setRoot({
  root: {
    component: {
      name: AUTH_SCREEN,
      passProps: {
        text: 'Auth screen'
      },
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
    }
  }
});

export const SetNicknameScreen = () => Navigation.setRoot({
  root: {
    component: {
      name: SET_NICKNAME_SCREEN,
      passProps: {
        text: 'Set Nickname screen'
      },
    },
  }
});

export const SelectIdolScreen = () => Navigation.setRoot({
  root: {
    component: {
      name: SELECT_IDOL_SCREEN,
      passProps: {
        text: 'Select Idol screen'
      },
    },
  }
});

// MainApp 네비게이션 함수 정의
export const MainApp = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'MAIN',
      children: [
        {
          stack: {
            children: [{
              component: {
                name: SCHEDULE_SCREEN,
              },
            }],
            options: {
              topBar: {
                text: '스케줄'
              },
              bottomTab: {
                text: '스케줄',
                testID: 'SCHEDULE_SCREEN',
                icon: require('../../assets/user.png'),
              },
            },
          },
        },
        {
          stack: {
            children: [{
              component: {
                name: NEWS_SCREEN,
              },
            }],
            options: {
              bottomTab: {
                text: '뉴스',
                testID: 'NEWS_SCREEN',
                icon: require('../../assets/user.png'),
              },
            },
          },
        },
        {
          stack: {
            children: [{
              component: {
                name: SEARCH_SCREEN,
              },
            }],
            options: {
              bottomTab: {
                text: '검색',
                testID: 'SEARCH_SCREEN',
                icon: require('../../assets/user.png'),
              },
            },
          },
        },
        {
          stack: {
            children: [{
              component: {
                name: MYPAGE_SCREEN,
              },
            }],
            options: {
              bottomTab: {
                text: '마이페이지',
                testID: 'MYPAGE_SCREEN',
                icon: require('../../assets/user.png'),
              },
            },
          },
        },
      ]
    },
  },
});

export const SettingScreen = () => Navigation.setRoot({
  root: {
    component: {
      name: MYPAGE_SETTING_SCREEN,
      passProps: {
        text: 'Select Idol screen'
      },
    },
  }
});

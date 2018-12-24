import { StatusBar } from 'react-native'
import React, { Component } from "react";

import Icon from 'react-native-vector-icons/Feather';
import {Navigation} from 'react-native-navigation';

import Login from './Login/Login'
import Auth from './AuthValidScreen'
import SetNickname from './InitProfile/SetNickname'
import SelectIdol from './InitProfile/SelectIdol'
import Feed from './Feed/Feed'
// import FeedCalendarTopBar from './Feed/components/FeedCalendarTopBar'
import FeedCalendar from './Feed/FeedCalendar'
import FeedLink from './Feed/FeedLink'
import Board from './Board/Board'
import Comments from '../components/Modal/CommentModal'
import Alarm from './Alarm/Alarm.js'
import MyPage from './MyPage/MyPage' 
import EditIdol from './MyPage/EditIdol' 
import EditMyProfile from './MyPage/EditMyProfile' 
import Search from './Search/Search'
import Setting from './MyPage/Setting' 

// 스크린 이름 및 const 정의
export const AUTH_SCREEN = 'Celebee.AuthScreen';
export const LOGIN_SCREEN = 'Celebee.LoginScreen';
export const SET_NICKNAME_SCREEN = 'Celebee.NicknameScreen';
export const SELECT_IDOL_SCREEN = 'Celebee.IdolScreen';
export const FEED_SCREEN = 'Celebee.FeedScreen';
// export const FEED_CALENDAR_TOP_BAR = 'Celebee.FeedCalendarTopBar';
export const FEED_CALENDAR_SCREEN = 'Celebee.FeedCalendarScreen';
export const FEED_LINK_SCREEN = 'Celebee.FeedLinkScreen'
export const BOARD_SCREEN = 'Celebee.BoardScreen';
export const COMMENTS_MODAL = 'Celebee.CommentsModal';
export const ALARM_SCREEN = 'Celebee.AlarmScreen';
export const MYPAGE_SCREEN = 'Celebee.MyPageScreen';
export const MYPAGE_EDIT_IDOL_SCREEN = 'Celebee.MyPageEditIdolScreen';
export const MYPAGE_EDIT_PROFILE_SCREEN = 'Celebee.MyPageEditProfileScreen';
export const SEARCH_SCREEN = 'Celebee.SearchScreen'
export const MYPAGE_SETTING_SCREEN = 'Celebee.MyPageSettingScreen';

// Screens Map() 함수
export const Screens = new Map();
Screens.set(AUTH_SCREEN, Auth)
Screens.set(LOGIN_SCREEN, Login)
Screens.set(SET_NICKNAME_SCREEN, SetNickname)
Screens.set(SELECT_IDOL_SCREEN, SelectIdol)
Screens.set(FEED_SCREEN, Feed)
// Screens.set(FEED_CALENDAR_TOP_BAR, FeedCalendarTopBar)
Screens.set(FEED_CALENDAR_SCREEN, FeedCalendar)
Screens.set(FEED_LINK_SCREEN, FeedLink)
Screens.set(BOARD_SCREEN, Board)
Screens.set(COMMENTS_MODAL, Comments)
Screens.set(ALARM_SCREEN, Alarm)
Screens.set(MYPAGE_SCREEN, MyPage)
Screens.set(MYPAGE_EDIT_IDOL_SCREEN, EditIdol)
Screens.set(MYPAGE_EDIT_PROFILE_SCREEN, EditMyProfile)
Screens.set(SEARCH_SCREEN, Search)
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

// MainApp 바텀 네비게텝이션 텝 정의
export const MainApp = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'MAIN',
      children: [
        {
          stack: {
            children: [{
              component: {
                name: FEED_SCREEN,
              },
            }],
            options: {
              bottomTab: {
                text: '피드',
                testID: 'FEED_SCREEN',
                icon: require('../../assets/feed.png'),
                iconColor: '#262626',
                selectedIconColor: "#722784",
                selectedTextColor: "#722784",
                // ...Platform.select({
                //     ios: {selectedIconColor: "#262626"}, 
                //     android: {selectedIconColor: '#C158C8'}
                // }),
              },
            },
          },
        },
        {
          stack: {
            children: [{
              component: {
                name: BOARD_SCREEN,
              },
            }],
            options: {
              bottomTab: {
                text: '게시판',
                testID: 'BOARD_SCREEN',
                icon: require('../../assets/board.png'),
                iconColor: '#262626',
                selectedIconColor: "#722784",
                selectedTextColor: "#722784"
              },
            },
          },
        },
        {
          stack: {
            children: [{
              component: {
                name: ALARM_SCREEN,
              },
            }],
            options: {
              bottomTab: {
                text: '알림',
                testID: 'ALARM_SCREEN',
                icon: require('../../assets/alarm.png'),
                iconColor: '#262626',
                selectedIconColor: "#722784",
                selectedTextColor: "#722784"
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
                icon: require('../../assets/mypage.png'),
                iconColor: '#262626',
                selectedIconColor: "#722784",
                selectedTextColor: "#722784"
              },
            },
          },
        },
      ]
    },
  },
});

export const FeedCalendarScreen = () => Navigation.setRoot({
  root: {
    component: {
      name: FEED_CALENDAR_SCREEN,
      passProps: {
        text: 'Select Idol screen'
      },
    },
  }
});

export const FeedLinkScreen = () => Navigation.setRoot({
  root: {
    component: {
      name: FEED_LINK_SCREEN,
      passProps: {
        text: 'feed link screen'
      },
    },
  }
});

export const SearchScreen = () => Navigation.setRoot({
  root: {
    component: {
      name: SEARCH_SCREEN,
      passProps: {
        text: 'search screen'
      }
    }
  }
})

export const CommentsModal = () => Navigation.setRoot({
  root: {
    component: {
      name: COMMENTS_MODAL,
      passProps: {
        text: 'comment modal'
      }
    }
  }
})

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

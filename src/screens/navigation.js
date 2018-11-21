import React, { Component } from 'react';

import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/AntDesign';

export const goToLogin = () => Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: 'Login',
            }
          }
      ],
      }
    }
  })

export const goHome = () => Navigation.setRoot({
  root: {    
    bottomTabs: {
      options: {
        bottomTabs: {
            backgroundColor: 'white',
            titleDisplayMode: 'alwaysShow',
        },
      },
      children: [{
        stack: {
          children: [{
            component: {
              name: 'Schedule',
              passProps: {
                text: 'This is tab 1'
              }
            }
          }],
          options: {
            bottomTab: {
              text: '스케쥴',
              icon: require('../../assets/user.png'),
              // selectedIconColor: 'black',
              testID: 'FIRST_TAB_BAR_BUTTON'
            }
          }
        }
      },
      {
        stack: {
          children: [{
            component: {
              name: 'News',
              passProps: {
                text: 'This is tab 1'
              },
              topBar: {
                title: {
                  text: 'My Screen',
                  color: 'red',
                }          
              }

            }
          }],
          options: {
            topBar: {
              visible: true,
              animate: false, // Controls whether TopBar visibility changes should be animated
              hideOnScroll: true,
              buttonColor: 'black',
              drawBehind: false,
              testID: 'topBar',
              title: {
                text: 'Title',
                fontSize: 14,
                color: 'red',
                fontFamily: 'Helvetica',
                component: {
                  name: 'News',
                  alignment: 'center'
                }
              },
              subtitle: {
                text: 'Title',
                fontSize: 14,
                color: 'red',
                fontFamily: 'Helvetica',
                alignment: 'center'
              },
              backButton: {
                icon: require('../../assets/user.png'),
                visible: true
              },
              // background: {
              //   color: '#00ff00',
              //   component: {
              //     name: 'Schedule'
              //   }
              // }
            },
            bottomTab: {
              text: 'Tab 1',
              icon: require('../../assets/user.png'),
              testID: 'FIRST_TAB_BAR_BUTTON'
            }
          }
        }
      },],     
    }
  }
});

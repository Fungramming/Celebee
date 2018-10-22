import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, TouchableOpacity, StatusBar, Button } from "react-native";
import { Container, Content, Thumbnail, Header, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import BottomNavigation from '../BottomNavigation'

// class MypageIcon extends Component {
//   goToMyPage = () => {
//     // this.props.navigation.navigate('MyPage')
//     alert('mypage')
//   }
//   render() {
//     // const { navigate } = this.props.navigation;
//     return (
//       <TouchableOpacity 
//         // onPress={() => navigate('MyPage')}
//       >
//         <Icon name="user" size={25} style={{paddingLeft: 24}} />
//       </TouchableOpacity>
//     )
//   }
// }
class MainScreen extends Component {

  static navigationOptions = {
  //   headerLeft: <MypageIcon />,
  //   title: 'Celebee',
  //   headerRight: 
  //   <TouchableOpacity>
  //     <Icon name="notification" size={25} style={{paddingRight: 24}}/>
  //   </TouchableOpacity>,
      header: null
  }

  render() {
    return (
      <Container>
        {/* <TopNaviBar /> */}
        <StatusBar 
          barStyle="dark-content"
          backgroundColor="#f2f2f2"
        />
        <BottomNavigation />
      </Container>
    );
  }
}

export default MainScreen;
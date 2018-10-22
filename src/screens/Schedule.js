import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Container, Content, Thumbnail, Header, Left, Right, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

// class MypageIcon extends Component {
//   constructor(props){
//     super(props) 
//   }
//   goToMyPage = () => {
//     this.props.navigation.navigate('MyPage')
//     alert('mypage')
//   }
  
//   render() {
//     return (
//       <Container style={styles.container}>
//         <Header>
//           <Left>
//             <TouchableOpacity onPress={() => this.props.navigation.navigate('MyPage')}>
//               <Icon name="user" size={25} style={{paddingLeft: 20}} />
//             </TouchableOpacity>
//           </Left>
//           <Title>스케쥴</Title>
//           <Right>
//             <TouchableOpacity>
//               <Icon name="user" size={25} style={{paddingRight: 20}} />
//             </TouchableOpacity>
//           </Right>
//         </Header>
//       </Container>
//     );
//   }
// }

class Schedule extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <MypageIcon/> */}
        <Text style={{position: "absolute", top: 0}}>스케쥴</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('MyPage')}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="user" size={350} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
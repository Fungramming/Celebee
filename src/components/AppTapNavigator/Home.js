import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';

// import { NavigationActions } from 'react-navigation';

// const navigateAction = NavigationActions.navigate({
//   routeName: 'Home',

//   params: {},

//   action: NavigationActions.navigate({ routeName: 'Home' }),
// });

// this.props.navigation.dispatch(navigateAction);

class Home extends Component {

  static navigationOptions = {
    title: '홈',
    tabIcon: () => {
      <Icon name="ios-home" size={30} />
    }
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text>Home</Text>
        </View>
      </Container>
    );
  }
}


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
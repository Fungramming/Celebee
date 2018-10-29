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
  TouchableOpacity 
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/AntDesign';

import {createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator} from 'react-navigation';
import Login from './src/screens/Login'
import MyPage from './src/screens/MyPage'
import SelectIdol from './src/screens/SelectIdol'
import BottomNavigation from './src/BottomNavigation'
import EditMyProfile from './src/screens/EditMyProfile'
import EditIdol from './src/screens/EditIdol'
import Setting from './src/screens/Setting'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }

  _onDone = () => {
    this.setState({ showRealApp: true });
  };

  _onSkip = () => {
    this.setState({ showRealApp: true });
  }  

  componentDidMount() {
    // SplashScreen.hide();
  }
  
  render() {
    if(this.state.showRealApp) {
      return (
        <AppSwichNavigator />
      );
    } else {
      return (
        <AppIntroSlider
          slides={slides}
          showSkipButton={true}
          hideNextButton={true}
          onDone={this._onDone}
          onSkip={this._onSkip}
          bottomButton
          skipLabel='시작하기'
          doneLabel='시작하기'
          buttonStyle={styles.button}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  // Slider
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16,
  },
  button: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15
  }
});

const slides = [
  {
    key: 's1',
    title: '셀',
    titleStyle: styles.title,
    text: '셀레비 어플입니다.',
    image: require('./assets/logo_white.png'),
    imageStyle: styles.image,
    backgroundColor: '#722784', 
  },
  {
    key: 's2',
    title: '레',
    titleStyle: styles.title,
    text: '셀레비 어플입니다.',
    image: require('./assets/logo_white.png'),
    imageStyle: styles.image,
    backgroundColor: '#722784',
  },
  {
    key: 's3',
    title: '비',
    titleStyle: styles.title,
    text: '셀레비 어플입니다.',
    image: require('./assets/logo_white.png'),
    imageStyle: styles.image,
    backgroundColor: '#722784', 
  },
  {
    key: 's4',
    title: '어',
    titleStyle: styles.title,
    text: '셀레비 어플입니다.',
    image: require('./assets/logo_white.png'),
    imageStyle: styles.image,
    backgroundColor: '#722784',
  },
  {
    key: 's5',
    title: '플',
    titleStyle: styles.title,
    text: '셀레비 어플입니다.',
    image: require('./assets/logo_white.png'),
    imageStyle: styles.image,
    backgroundColor: '#722784',
  },
  {
    key: 's6',
    title: '!',
    titleStyle: styles.title,
    text: '셀레비 어플입니다.',
    image: require('./assets/logo_white.png'),
    imageStyle: styles.image,
    backgroundColor: '#722784',
  },
];

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

const AppSwichNavigator = createSwitchNavigator({
  Login: Login,
  SelectIdol: SelectIdol,
  App: AppStackNavigator,
})

import React, { Component } from "react";
import { 
  Share,
  Image,
  Platform, 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  FlatList,
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  DatePickerIOS, 
  DatePickerAndroid,
  NativeModules,
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux'
import { Calendar, LocaleConfig, CalendarList, Agenda } from 'react-native-calendars';
import { Navigation } from 'react-native-navigation'

import FeedCard from '../../components/Card/FeedCard'
import { FEED_CALENDAR_SCREEN, FEED_LINK_SCREEN, COMMENT_MODAL } from '../Navigation'
import IdolIndicator from '../../../src/screens/Feed/components/IdolIndicator'
import SearchButton from '../../components/button/SearchButton'
import { fetchFeedRequest } from "../../actions/feed";

// 달력 출력 폼 설정
  const today = (() => {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-')
  })()

  LocaleConfig.locales['KR'] = {
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['1.','2.','3.','4.','5.','6.','7.','8.','9.','10.','11.','12.'],
    dayNames: ['일요일', '월요일','화요일','수요일','목요일','금요일','토요일'],
    dayNamesShort: ['일', '월','화','수','목','금','토']
  };
  LocaleConfig.defaultLocale = 'KR';

class Feed extends Component {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      }
    }
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);  

    this.state = { 
      chosenDate: new Date(),
      follow_idol_id: this.props.userInfo.follow_idol_id,
      toggleDate: false,
      toggleDetail: false,
      selectedDay: today,           
      testData: ["2010-10-10","2010-10-11"],
      refreshing: false,
      token: this.props.token
    };
    this.setDate = this.setDate.bind(this);
    this.watchScroll = this.watchScroll.bind(this);
    this.onPressLink = this.onPressLink.bind(this)
    this.onPressCalendar = this.onPressCalendar.bind(this)
    // this.onToggleDetail = this.onToggleDetail.bind(this)
    this.onToggleDate = this.onToggleDate.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.fetchFeed = this.fetchFeed.bind(this)
  }

  setDate(newDate) {
    this.setState({
      chosenDate: newDate,
    })
  }

  onToggleDetail() {
    const toggle = !this.state.toggleDetail;
    this.setState(prevState => ({
      ...prevState,
      toggleDetail: toggle
    }))
  }

  onToggleDate() {
    const toggle = !this.state.toggleDate;
    this.setState(prevState => ({
      ...prevState,
      toggleDate: toggle
    }))
    if(Platform.OS == "android") {
      this.toggleDateAndroid()
    }
  }

  toggleDateAndroid = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
        date: this.state.chosenDate,
        // minDate: new Date(),
        // maxDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ chosenDate: new Date(year, month, day) });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };
  
  watchScroll = (event) => {
  const RCTUIManager = NativeModules.UIManager
  const sv = this.refs['scrollView']
  RCTUIManager.measure(sv.getInnerViewNode(), (...data) => {
    console.log(data[5], 111)
  })
    // 정확성이 떨어지는 코드
    // const nEvent = event.nativeEvent;

    // this.setState({
    //     scrollPosition: nEvent.contentOffset.y
    // });

    // if ((nEvent.contentOffset.y +
    //     nEvent.layoutMeasurement.height) >=
    //         nEvent.contentSize.height) {
    //     this.setState({ bottomVisible: false });
    // } else {
    //     this.setState({ bottomVisible: true });
    // }

    // console.log('this.state.scrollPosition :', this.state.scrollPosition);
  }
  
  onPressLink() {
    Navigation.push(this.props.componentId, {
      component: {
        name: FEED_LINK_SCREEN,
        passProps: {
          url: 'https://naver.com',          
        },
        options: { 
          topBar: {
            visible: false, drawBehind: true,  
          },
          bottomTabs: { 
            visible: false, drawBehind: true,
          }
        }
      }
    })
  }

  onPressCalendar() {
    Navigation.push(this.props.componentId, {
      component: {  
        name: FEED_CALENDAR_SCREEN,  
        options:{
          topBar:{
            visible: false,
            drawBehind: true,
          }
        }       
      }
    })
    this.toggleDateFalse()
  }

  toggleDateFalse() {
    if (this.state.toggleDate) {
      this.setState(prevState => ({
        ...prevState,
        toggleDate: false
      }))
    } 
  }
  
  onEndReached() {
    let newA = this.state.testData
    this.setState(prevState => ({
      ...prevState,
      testData: [...prevState.testData, "2010-10-12", "2010-10-13"]
    }));
  }

  onRefresh() {
    console.log('111111111111111111111111111111111', 111111111111111111111111111111111)
  }

  fetchFeed() {
    console.log('this.state.chosenDate.toLocaleDateString', this.state.chosenDate) 
    let date = "18.12.28"
    this.props.feed(date)
  }

  render() {
    // 날짜 출력 폼
    let options = { year: 'numeric', month: 'long', day: 'numeric' };  

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content"/>
          <View style={styles.header}>
            <TouchableOpacity onPress={this.fetchFeed}>
              <Text>fetchFeed</Text>
            </TouchableOpacity>
            <Text style={styles.date} onPress={this.onToggleDate}>
              {this.state.chosenDate.toLocaleDateString('ko-KR', options)}
              &nbsp;
              {Platform.OS == "android"?<Icon name="popup" size={22} /> :this.state.toggleDate ? <Image style={styles.iconSize} source={require('../../../assets/up.png')}/> : <Image style={styles.iconSize} source={require('../../../assets/down.png')}/> }
              {/* {this.state.toggleDate ? <Icon name='chevron-up' size={22}/> : <Icon name='chevron-down' size={22}/>} */}
            </Text>
            <TouchableOpacity onPress={this.onPressCalendar}>
              <Image style={styles.iconSize} source={require('../../../assets/calendar.png')} />
            </TouchableOpacity>
            <SearchButton componentId={this.props.componentId}/>
          </View>

          {this.state.toggleDate && Platform.OS == 'ios'
          ? <DatePickerIOS
            date={this.state.chosenDate}
            mode='date'
            locale='kor'
            onDateChange={this.setDate}
            style={styles.datePicker}
          />
          : null
          }

          <IdolIndicator />

          <FlatList
            data={this.state.testData}
            initialNumToRender={20}
            onEndReachedThreshold={0.2}
            onEndReached={this.onEndReached}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <FeedCard 
                  onLink={this.onPressLink} 
                  detail={this.onToggleDetail} 
                  date={item}
                  componentId={this.props.componentId}
                  ></FeedCard>                              
                )
            }}
            keyExtractor={(index) => index.toString()}
          />

        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
      feedList: state.feed.schedule,
      token: state.user.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    feed: (token) => {
      dispatch(fetchFeedRequest(token))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  header: {
    paddingTop: 10,
    paddingBottom: 17,
    paddingHorizontal: 12,
    flexDirection:'row',
    position: 'relative',
    zIndex: 999
  },
  date: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginRight: 'auto'
  },
  datePicker: {
    height: 0,
    position: "relative",
    top: -107,
    left: 0,
    zIndex: 998,
  },
  iconSize: {
    width: 25,
    height: 25
  }
});
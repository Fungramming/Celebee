import React, { Component } from "react";
import { 
  Share,
  Image,
  Platform, 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  FlatList,
  ListView,
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  DatePickerIOS, 
  DatePickerAndroid,
  NativeModules,
  RefreshControl
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux'
import { Calendar, LocaleConfig, CalendarList, Agenda } from 'react-native-calendars';
import { Navigation } from 'react-native-navigation'

import FeedCard from '../../components/Card/FeedCard'
import { FEED_CALENDAR_SCREEN, FEED_LINK_SCREEN, COMMENT_MODAL } from '../Navigation'
import IdolIndicator from '../../../src/screens/Feed/components/IdolIndicator'
import SearchButton from '../../components/button/SearchButton'
import AlarmButton from '../../components/button/AlarmButton'
import { fetchFeedRequest } from "../../actions/feed";

// 달력 출력 폼 설정
  const formDate = (d) => {   
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-')
  }

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
      feedInfo: this.props.feedInfo,
      chosenDate: new Date(),
      follow_idol_id: this.props.userInfo.follow_idol_id,
      toggleDate: false,
      toggleDetail: false,
      testData: ["2010-10-10","2010-10-11"],
      refreshing: false,
      token: this.props.token,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2 }),
      cars : [
        {name:'Datsun',color:'White'},
        {name:'Camry',color:'Green'}
      ]
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

  componentDidMount(){
    this.fetchFeed("next")
  }

  componentDidUpdate(prevProps){
    console.log('1prevProps', prevProps)
    console.log('2this.props', this.props)
    if(prevProps.feedInfo.current_page !== this.props.feedInfo.current_page){
      let updatedFeedInfo = prevProps.feedInfo.schedules.concat(this.props.feedInfo.schedules)
      console.log('prevProps.feedInfo.schedules', prevProps.feedInfo.schedules)
      console.log('this.props.feedInfo.schedules', this.props.feedInfo.schedules)
      console.log('updatedFeedInfo', updatedFeedInfo)
      this.setState(prevState => ({
        ...prevState,
        feedInfo: this.props.feedInfo.schedules
      }))
    }    
    console.log('3this.state', this.state)
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
    console.log('aff111111111111', 111111111111)
    // this.setState(prevState => ({
    //   ...prevState,
    //   testData: [...prevState.testData, "2010-10-12", "2010-10-13"]
    // }));
    
    // this.fetchFeed("next")
  }

  onRefresh() {
    // this.fetchFeed("prev")
  }

  fetchFeed(obj) {
    let valid = typeof this.state.feedInfo.schedules[0].date
    if(!valid){
      let pageNum;
      let date = formDate(this.state.chosenDate)

      if(obj == "prev"){

        pageNum = this.state.feedInfo.current_page - 1
        this.setState(prevState => ({
          ...prevState,
          feedInfo: {
            ...prevState.feedInfo,
            current_page: this.state.feedInfo.current_page - 1
          }
        }))
      } else if(obj == "next") {
        pageNum = this.state.feedInfo.current_page + 1
        this.setState(prevState => ({
          ...prevState,
          feedInfo: {
            ...prevState.feedInfo,
            current_page: this.state.feedInfo.current_page + 1
          }
        }))
      }

      let payload = {
        token: this.state.token,
        date : date,
        current_page: pageNum
      }    
      // if(payload.current_page == 0){
      //   payload.current_page = -1
      // }
      console.log('@@@payload', payload)
      this.props.feed(payload)

    }
    
   
  }

  render() {
    // 날짜 출력 폼
    let options = { year: 'numeric', month: 'long', day: 'numeric' };  

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content"/>
          <View style={styles.header}>           
            <Text style={styles.date} onPress={this.onToggleDate}>
              {this.state.chosenDate.toLocaleDateString('ko-KR', options)}
              &nbsp;
              {Platform.OS == "android"?<Icon name="popup" size={22} /> :this.state.toggleDate ? <Image style={styles.iconSize} source={require('../../../assets/up.png')}/> : <Image style={styles.iconSize} source={require('../../../assets/down.png')}/> }
              {/* {this.state.toggleDate ? <Icon name='chevron-up' size={22}/> : <Icon name='chevron-down' size={22}/>} */}
            </Text>
            <TouchableOpacity onPress={this.onPressCalendar}>
              <Image style={styles.iconSize} source={require('../../../assets/calendar.png')} />
            </TouchableOpacity>
            <AlarmButton componentId={this.props.componentId}/>
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

          {/* <FlatList
            data={this.state.feedInfo}
            onScrollBeginDrag={() => console.log("start")}
            initialNumToRender={20}
            // onEndReachedThreshold={0.1}
            // onEndReached={this.onEndReached}
            // showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <FeedCard 
                  onLink={this.onPressLink} 
                  detail={this.onToggleDetail} 
                  info={item}
                  componentId={this.props.componentId}
                  ></FeedCard>                              
                )
            }}
            keyExtractor={(item, index) => item.id.toString()}
          /> */}
          {/* <ListView
            // refreshControl={this._refreshControl()}
            dataSource={this.state.feedInfo.schedules}
            renderRow={(car) => this._renderListView(car)}>
          </ListView> */}

        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
      feedInfo: state.feed,
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
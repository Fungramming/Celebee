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
      refreshing: false
    };
    this.setDate = this.setDate.bind(this);
    this.watchScroll = this.watchScroll.bind(this);
    this.onPressLink = this.onPressLink.bind(this)
    this.onPressCalendar = this.onPressCalendar.bind(this)
    // this.onToggleDetail = this.onToggleDetail.bind(this)
    this.onToggleDate = this.onToggleDate.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }
  
  setDate(newDate) {
    this.setState({
      chosenDate: newDate,
    })
  }

  // onToggleDetail() {
  //   const toggle = !this.state.toggleDetail;
  //   this.setState(prevState => ({
  //     ...prevState,
  //     toggleDetail: toggle
  //   }))
  // }

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
    console.log('newA', newA)
    this.setState(prevState => ({
      ...prevState,
      testData: [...prevState.testData, "2010-10-12", "2010-10-13"]
    }));
    console.log('this.state.testData', this.state)
  }

  onRefresh() {
    console.log('111111111111111111111111111111111', 111111111111111111111111111111111)
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
          {/* {this.state.toggleDetail 
            ? 
            <Text style={styles.feedDetail} onPress={this.onToggleDetail}>
              <Text>피드 상세 내용</Text>
              <Text style={styles.feedDetailText}>
                생방송 SBS 인기가요 - 사전 녹화 * 일 시 : 2018. 12. 09. (일) 09:00 AM * 장 소 : SBS 등촌동 공개홀 상단의 시간은 입장 번호 배정 시작 시간이니 착오 없으시기 바라며, 입장 시간은 일정하지 않고 방송국 상황에 따라 달라질 수 있으니, 가급적 일찍 도착해 주시기 바랍니다. 많은 참여 부탁 드립니다. [ 참여 방법 ] http://redvelvet.smtown.com/ 참여방법은 해당 링크를 참조해주세요!
              </Text>
            </Text>
            : null
          } */}

        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
  }
}

export default connect(mapStateToProps)(Feed)

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
  // feedDetail: {
  //   height: 490,
  //   width: Dimensions.get('window').width,
  //   paddingHorizontal: 12,
  //   paddingTop: 12,
  //   marginTop: 10,
  //   backgroundColor: '#f5f5f5',
  //   position: 'absolute',
  //   top: 72,
  //   zIndex: 99
  // },
  // feedDetailText: {
  //   color: '#505050',
  //   fontSize: 16,
  // },
  iconSize: {
    width: 25,
    height: 25
  }
});
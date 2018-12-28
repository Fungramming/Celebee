import React, { Component } from 'react'
import { 
  SafeAreaView, 
  StyleSheet, 
  Text,
  Image, 
  View, 
  TouchableWithoutFeedback,
  TouchableOpacity, 
  FlatList, 
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
  DatePickerIOS,
  DatePickerAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux'
import { Calendar, LocaleConfig} from 'react-native-calendars';
import { Navigation } from 'react-native-navigation';
import Modal from "react-native-modal";

// import { FEED_CALENDAR_TOP_BAR } from '../Navigation'
import ScheduleHeader from '../../../src/screens/Feed/components/ScheduleHeader'
import IdolIndicator from '../../../src/screens/Feed/components/IdolIndicator'
import FeedCard from '../../components/Card/FeedCard'
import SearchButton from '../../components/button/SearchButton'
import { FEED_CALENDAR_SCREEN, FEED_LINK_SCREEN } from '../Navigation'

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

LocaleConfig.locales['kr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1.','2.','3.','4.','5.','6.','7.','8.','9.','10.','11.','12.'],
  dayNames: ['일요일', '월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토']
};
LocaleConfig.defaultLocale = 'kr';

class DayNames extends Component {
  render() {
    return (    
    <View style={styles.dayNamesBox}>
        <Text style={[styles.dayNames, {color: '#FF0000'}]}>일</Text>
        <Text style={[styles.dayNames]}>월</Text>
        <Text style={[styles.dayNames]}>화</Text>
        <Text style={[styles.dayNames]}>수</Text>    
        <Text style={[styles.dayNames]}>목</Text>
        <Text style={[styles.dayNames]}>금</Text>
        <Text style={[styles.dayNames, {color: '#0258BB'}]}>토</Text>        
      </View>
    )
  }
}

class FeedCalendar extends Component {  
  constructor(props) {
    super(props);
    this.state = { 
      chosenDate: new Date(),
      follow_idol_id: this.props.userInfo.follow_idol_id,
      toggleDate: false,
      selectedDay: today,
      selected: false,
      fureSchedules: { 
        '2018-12-14': { marked: true, dotColor: 'purple',},
        '2018-12-15': { marked: true, dotColor: 'purple',},
        '2018-12-16': { marked: true, dotColor: 'purple',},
        '2018-12-17': { marked: true, dotColor: 'purple',},
        '2018-12-19': {marked: true, dotColor: 'purple',}
      },
      schedules: { 
        '2018-12-14': { marked: true, dotColor: 'purple',},
        '2018-12-15': { marked: true, dotColor: 'purple',},
        '2018-12-16': { marked: true, dotColor: 'purple',},
        '2018-12-17': { marked: true, dotColor: 'purple',},
        '2018-12-19': {marked: true, dotColor: 'purple',}
      },

      isFeedModalVisible: true

    };
    this.setDate = this.setDate.bind(this);
    this.onDayPress = this.onDayPress.bind(this);
    this.onBackButton = this.onBackButton.bind(this);
    this.onToggleDate = this.onToggleDate.bind(this);
    this.onToggleModal = this.onToggleModal.bind(this);
    this.onPressLink = this.onPressLink.bind(this);
  }

  componentDidMount() {
    this.onDayPress(this.state.chosenDate)
  }

  setDate(newDate) {
    this.setState({
      chosenDate: newDate,
    })
  }

  makeDate(year, month, day) {
    var d = new Date(year, month, day),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-')
  }

  onDayPress(date) {    
    console.log('date', date)
    // DATEPICKER 리턴값과 캘린더 리턴값이 다름
    if(date.dateString == undefined){
      date = date
    } else if(date.dateString){
      date = date.dateString
    }
    let selectedDate = {
      ...this.state.fureSchedules[date],
      selected: true
    }
    
    this.setState(prevState => ({
      ...prevState,
      selected: true,
      schedules: {
        ...prevState.fureSchedules,
        [date] : selectedDate
      }
    }))    
  }

  onToggleModal() {
    this.setState(prevState => ({ 
      ...prevState,
      isFeedModalVisible: !this.state.isFeedModalVisible 
    }));
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
        minDate: this.state.chosenDate,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ chosenDate: new Date(year, month, day) });
        let date = this.makeDate(year, month, day)
        console.log('date :', date);
        this.onDayPress(date)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  onBackButton() {
    Navigation.pop(this.props.componentId);
  }

  onPressLink() {
    this.setState(prevState => ({
      ...prevState,
      isFeedModalVisible: false
    }))

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

  render() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };  
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content"/>
        <View style={styles.header}>        
          <Text style={styles.date} onPress={this.onToggleDate}>
            {this.state.chosenDate.toLocaleDateString('ko-KR', options)}
            &nbsp;
            {Platform.OS == "android"?<Icon name="popup" size={22} /> :this.state.toggleDate ? <Image style={styles.iconSize} source={require('../../../assets/up.png')}/> : <Image style={styles.iconSize} source={require('../../../assets/down.png')}/> }
            {/* {this.state.toggleDate ? <Icon name='chevron-up' size={22}/> : <Icon name='chevron-down' size={22}/>} */}
          </Text>        
          <TouchableOpacity onPress={this.onBackButton}>
            <Image style={styles.iconSize} source={require('../../../assets/feed.png')} />
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
        <IdolIndicator/>
        <DayNames />
        <Calendar
          current={this.state.chosenDate}
          monthFormat={'yyyy년 MM월'}
          onDayPress={this.onDayPress}
          hideExtraDays
          hideArrows={true}
          markedDates={this.state.schedules}
        />
        <ScrollView
          ref="scrollView"
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}>
          <View onPress={this.onToggleModal}>
            <ScheduleHeader />
          </View>
        </ScrollView>

        {/* 피드 모달 */}

          <Modal isVisible={this.state.isFeedModalVisible} style={{justifyContent: "center", margin: 0}} deviceHeight={Dimensions.get('window').height}>
            <Text style={styles.feedToggleBtn} onPress={this.onToggleModal} />
            <View>
              <FeedCard onLink={this.onPressLink} componentId={this.props.componentId}/>
            </View>
          </Modal>


      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
  }
}

export default connect(mapStateToProps)(FeedCalendar)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: "#ffffff"
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
  dayNamesBox: {
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row', 
    paddingVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'space-around'
  },
  dayNames: {
    textAlign: 'center',
    fontSize: 12,
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
  scrollArea: {
    paddingHorizontal: 12,
    height: 292
  },
  feedToggleBtn: {
    position: 'absolute',
    top: 0,
    height: Dimensions.get('window').height, 
    width: Dimensions.get('window').width 
  },
  iconSize: {
    width: 25,
    height: 25
  }
});
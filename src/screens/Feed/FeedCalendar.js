import React, { Component } from 'react'
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  TouchableWithoutFeedback,
  TouchableOpacity, 
  FlatList, 
  Dimensions,
  ScrollView,
  Platform,
  DatePickerIOS,
  DatePickerAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux'
import { Calendar, LocaleConfig} from 'react-native-calendars';
import { Navigation } from 'react-native-navigation';

import ScheduleHeader from '../../../src/screens/Feed/components/ScheduleHeader'
import IdolIndicator from '../../../src/screens/Feed/components/IdolIndicator'

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

class FeedCalendar extends Component {
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
      }
    };
    this.setDate = this.setDate.bind(this);
    this.onPressDay = this.onPressDay.bind(this);
    this.onBackButton = this.onBackButton.bind(this);
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

  onPressDay(date) {    
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

  _onToggleDate() {
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

  render() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };  
    return (
      <SafeAreaView>
        <View style={styles.header}>        
          <TouchableWithoutFeedback onPress={() => this._onToggleDate()}>
            <Text style={styles.date}>
              {this.state.chosenDate.toLocaleDateString('ko-KR', options)}
              &nbsp;
              {this.state.toggleDate ? <Icon name='chevron-up' size={22}/> : <Icon name='chevron-down' size={22}/>}
            </Text>        
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={this.onBackButton}>
            <Icon name='layers' style={{paddingRight: 12}} size={22}/>
          </TouchableOpacity>
          <Icon name='search' style={{paddingRight: 12}} size={22}/>
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

        <Calendar
          current={this.state.chosenDate}
          monthFormat={'yyyy년 MM월'}
          onDayPress={this.onPressDay}
          // hideDayNames={true}
          hideExtraDays
          hideArrows={true}
          markedDates={this.state.schedules}
        />

        <ScrollView
          ref="scrollView"
          style={styles.scrollArea}
          // scrollEventThrottle={16}
          // onScroll={ console.log('hahahaah')} 
          showsVerticalScrollIndicator={false}>
          <ScheduleHeader/>           
        </ScrollView>

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
    paddingLeft: 12,
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
  scrollArea: {
    paddingHorizontal: 12,
    height: 360
  }
});
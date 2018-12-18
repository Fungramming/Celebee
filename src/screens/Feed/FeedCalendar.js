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
  Platform, 
  DatePickerAndroid } from 'react-native'
import { connect } from 'react-redux'

import { Calendar, LocaleConfig} from 'react-native-calendars';

import { MainApp, FeedCalendarScreen } from '../Navigation'

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

class IdolList extends Component {
  render() {
    return (
      <View>
        <Text style={styles.idolName}>{this.props.name}</Text>
      </View>
    )
  }
}

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
    this.onDayPress = this.onDayPress.bind(this);
    this.backButton = this.backButton.bind(this);
  }

  backButton() {
    MainApp()
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

  render() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };  
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => this._onToggleDate()}>
            <Text style={styles.date}>
              {this.state.chosenDate.toLocaleDateString('ko-KR', options)}
              &nbsp;<Text style={{paddingLeft: 18, fontSize: 18, fontWeight: 'bold'}}>+</Text>
            </Text>        
          </TouchableWithoutFeedback>
          <Text>검색</Text>
        </View>
        {/* <TouchableOpacity onPress={this.backButton}>
          <Text>뒤로가기</Text>
        </TouchableOpacity>
        <Text> FeedCalendar </Text> */}
        <View style={{height: 30}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.props.userInfo.follow_idol_id}
            renderItem={({item}) => {
                return <IdolList style={styles.idolList} name={item.idol_name}></IdolList> 
            }}
            keyExtractor={(item, index) => index.toString()}
            style={
              {                  
                paddingLeft: 29, 
                borderBottomColor: 'rgb(200, 200, 200)',
                borderBottomWidth: 2
              }
            }
          />
        </View>
        <Calendar
          current={this.state.chosenDate}
          monthFormat={'yyyy년 MM월'}
          onDayPress={this.onDayPress}
          // hideDayNames={true}
          hideExtraDays
          hideArrows={true}
          markedDates={this.state.schedules}
        />
        <View style={{ backgroundColor: 'red', height: 350}}>
          <Text style={{ textAlign: 'center', backgroundColor: 'black'}}>스케주우우우우우우울우우우우우우울</Text>
          <Text>스케주우우우우우우울우우우우우우울</Text>
        </View>

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
    // flex: 1,
    // flexWrap: 'wrap', 
    // alignItems: 'flex-start',
    flexDirection:'row',
    position: 'relative',
    zIndex: 999
  },
  date: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
  datePicker: {
    height: 0,
    position: "relative",
    top: -107,
    left: 0,
    zIndex: 998,
  },
  idolList: {
    height: 0,
  },
  idolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#878787',
    textAlign: 'center',
    marginRight: 26,
  }
});
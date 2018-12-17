import React, { Component } from "react";
import { 
  Platform, 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  DatePickerIOS, 
  DatePickerAndroid,
  FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux'
import FeedCard from '../../components/Card/FeedCard'
import { Calendar, LocaleConfig, CalendarList, Agenda } from 'react-native-calendars';

import { FeedCalendarScreen } from '../Navigation'

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
    this.state = { 
      chosenDate: new Date(),
      follow_idol_id: this.props.userInfo.follow_idol_id,
      toggleDate: false,
      selectedDay: today,
      markedDates: {
        // '2018-12-12': {selected: true, marked: true, selectedColor: 'white', dotColor: 'purple'},
        '2018-12-12': {marked: true, dotColor: "purple"},
        '2018-12-13': {marked: true},
        '2018-12-14': {selected: true, marked: true, dotColor: 'purple', activeOpacity: 0},
        '2018-12-15': {disabled: true, disableTouchEvent: true}
      }
    };
    this.setDate = this.setDate.bind(this);
    this.onDayPress = this.onDayPress.bind(this);
  }
  
  setDate(newDate) {
    this.setState({
      chosenDate: newDate,
    })
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
        date: new Date(),
        minDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ chosenDate: new Date(year, month, day) });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  onDayPress(day) {
    console.log('day :', day);
    this.setState(prevState => ({
      ...prevState,
      selectedDay: day.dateString
    }))
  }

  render() {
    // 날짜 출력 폼
    let options = { year: 'numeric', month: 'long', day: 'numeric' };  
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content"/>
          <View style={styles.header}>
            <Text style={styles.date} onPress={() => this._onToggleDate()}>
              {this.state.chosenDate.toLocaleDateString('ko-KR', options)}
              &nbsp;
              {this.state.toggleDate ? <Icon name='chevron-up' size={22}/> : <Icon name='chevron-down' size={22}/>}
            </Text>
            <TouchableOpacity onPress={FeedCalendarScreen}>
              <Icon name='calendar' style={{paddingRight: 12}} size={22}/>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <FeedCard></FeedCard>
            <FeedCard></FeedCard>
            <FeedCard></FeedCard>            
          </ScrollView>
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
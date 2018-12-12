import React, { Component } from "react";
import {Modal,TouchableHighlight,Alert,ScrollView, Platform, SafeAreaView, StatusBar, View, Text, StyleSheet, TouchableOpacity, DatePickerAndroid, DatePickerAndroidOpenOptions , DatePickerIOS, FlatList} from "react-native";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { connect } from 'react-redux'
import FeedCard from '../../components/Card/FeedCard'
const calendar = {
  day: 1,     // day of month (1-31)
  month: 1,   // month of year (1-12)
  year: 2017, // year
  dateString: '2016-05-13', // date formatted as 'YYYY-MM-DD' string,
  foo:'2016-05-13'
}

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
      modalVisible: false,
      androidDate: new Date()
    };
    this.setDate = this.setDate.bind(this);
  }
  
  setDate(newDate) {
    this.setState({
      chosenDate: newDate,
      androidDate: newDate
    })
  }

  _onToggleDate() {
    const toggle = !this.state.toggleDate;
    this.setState(prevState => ({
      ...prevState,
      toggleDate: toggle
    }))
    if(Platform.OS == "android") {
      this.setDateAndroid()
    }
  }

  setDateAndroid = async () => {
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


  render() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <View style={styles.header}>
          <Text style={styles.date}>{this.state.chosenDate.toLocaleDateString('ko-KR', options)}</Text>
          <TouchableOpacity onPress={() => this._onToggleDate()}>
            <Text style={{paddingLeft: 18, fontSize: 18, fontWeight: 'bold'}}>+</Text>
          </TouchableOpacity>
          <Text>월간 캘린더</Text>
          <Text>검색</Text>
        </View>       
        {this.state.toggleDate && Platform.OS == 'ios'
        ? 
          <DatePickerIOS
          date={this.state.chosenDate}
          mode='date'
          locale='kor'
          onDateChange={this.setDate}
        />
        : null
        }
        <ScrollView>                             
        <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.props.userInfo.follow_idol_id}
                  renderItem={({item}) => {
                      return <IdolList name={item.idol_name}></IdolList> 
                  }}
                  keyExtractor={(item, index) => index.toString()} 
                  style={
                    {
                      marginLeft: -17,
                      paddingLeft: 29, 
                      borderBottomColor: 'rgb(200, 200, 200)', 
                      borderBottomWidth: 2.5
                    }
                  }
                />
                <FeedCard></FeedCard>
        </ScrollView>
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
    backgroundColor:"#ffffff",
    paddingLeft: 12,
    // flex: 1,
    // justifyContent: 'center',
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  header: {
    paddingTop: 18,
    paddingBottom: 18,
    // paddingLeft: 18,
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  date: {
    fontSize: 20, 
    fontWeight: 'bold',
    // flexDirection:'column',
  },
  btn: {
    backgroundColor: 'rgb(240,240,240)'
  },
  idolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#878787',
    textAlign: 'center',
    // backgroundColor: 'purple',
    // marginTop: 14,
    marginBottom: 12,
    marginRight: 26,
    height: 17,
  }
});
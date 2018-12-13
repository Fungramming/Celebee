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
  FlatList, Modal } from "react-native";
import { connect } from 'react-redux'
import FeedCard from '../../components/Card/FeedCard'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
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
      modalVisible : false
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  test111(close) {
    this.setState({modalVisible: close});
  }

  onDayPress(date) {
    console.log('date :', date);
  }

  render() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
    const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content"/>
          <View style={styles.header}>
            <Text style={styles.date} onPress={() => this._onToggleDate()}>
              {this.state.chosenDate.toLocaleDateString('ko-KR', options)}
              &nbsp;<Text style={{paddingLeft: 18, fontSize: 18, fontWeight: 'bold'}}>+</Text>
            </Text>
            <Text>월간 캘린더</Text>
            <Text>검색</Text>
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
          <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal  
    style={{backgroundColor: 'black',}}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState(prevState=>({
              ...prevState,
              modalVisible: false
            }))
          }}>
          <View style={{marginTop: 22}}>
            <View>
            <Calendar
              current={this.state.foo}
                  monthFormat={'yyyy년 MM월'}
                  onDayPress={this.onDayPress}
                  style={styles.calendar}
                  // hideDayNames={true}
                  hideArrows={true}
                  // markedDates={{[this.state.chosenDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
                  markedDates={{
                    '2018-12-12': {selected: true, marked: true},
                    '2018-12-13': {selected: true, marked: true},
                    '2018-12-14': {selected: true, marked: true},
                    '2018-12-15': {disabled: true, disableTouchEvent: true},
                    '2018-12-16': {selected: true, marked: true, selectedColor: 'black'},
                    '2018-12-22': {selected: true, marked: true, selectedColor: 'black'},
                  }}
                  
            />          
              <TouchableOpacity
                onPress={() => {
                  this.test111(false);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        </Modal>   
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
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
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
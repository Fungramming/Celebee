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
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
    console.log('Platform.OS  :', Platform.OS );
    if(Platform.OS == "android") {
      this.setDateAndroid()
    }
  }

  //  openAndroidDatePicker = async () => {
  //   let minDate =  new Date('2017.12.12').toISOString()
  //   let maxDate =  new Date('2019.12.12').toISOString()
  //   console.log('minDate :', minDate);
  //   try {
  //     const {action, year, month, day} = await DatePickerAndroid.open({
  //       date: new Date(),
  //       // mode:"spinner"
  //     });
  //     if (action !== DatePickerAndroid.dismissedAction) {
  //       // Selected year, month (0-11), day
  //       // console.log('action :', `${day}/${month + 1}/${year}`);
  //       console.log('day, month, year :', day, month, year);
  //       console.log('action :', action);
  //       this.setState({ androidDate: `${day}/${month + 1}/${year}` });
  //     }
  //   } catch ({code, message}) {
  //     console.warn('Cannot open date picker', message);
  //   }
  // }

  test111() {
    this.setState(prevState => ({
      ...prevState,
      foo: '2020.10.10'
    }))
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
        console.log('this.state.chosenDate :', this.state.chosenDate);
        console.log('new Date(year, month, day) :', new Date(year, month, day));
        this.setState({ chosenDate: new Date(year, month, day) });
        // this.setState({ androidDate: `${day}/${month + 1}/${year}` });
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
        {/* {this.state.toggleDate 
        ? 
          <DatePickerIOS
          date={this.state.chosenDate}
          mode='date'
          locale='kor'
          onDateChange={this.setDate}
        />
        : null
        } */}
        <ScrollView>              
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal
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
                  markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
            />
             {/* <Calendar
                    style={styles.calendar}
                    onDayLongPress={this.onDayLongPress}
                    hideExtraDays
                    monthFormat={'yyyy MM'}
                    current={'2018-03-01'}
                    minDate={'2018-03-01'}
                    markingType={'custom'}
                    markedDates={{
                      '2018-03-01': {
                        customStyles: {
                          container: {
                            backgroundColor: 'white',
                            elevation: 2
                          },
                          text: {
                            color: 'blue',
                          },
                        }
                      },
                      '2018-03-08': {selected: true},
                      '2018-03-09': {
                        customStyles: {
                          container: {
                            backgroundColor: 'red',
                            elevation: 4,
                          },
                          text: {
                            color: 'white',
                          },
                        }
                      },
                      '2018-03-10': {disabled: true},
                      '2018-03-14': {
                        customStyles: {
                          container: {
                            backgroundColor: 'green',
                          },
                          text: {
                            color: 'white',
                          },
                        },
                      },
                      '2018-03-15': {
                        customStyles: {
                          container: {
                            backgroundColor: 'black',
                            elevation: 2
                          },
                          text: {
                            color: 'yellow',
                          },
                        }
                      },
                      '2018-03-20': {
                        customStyles: {
                          container: {
                            backgroundColor: 'pink',
                            elevation: 4,
                          },
                          text: {
                            color: 'blue',
                          },
                        }
                      },
                      '2018-03-21': {disabled: true},
                      '2018-03-28': {
                        customStyles: {
                          container: {
                            backgroundColor: 'green',
                          },
                          text: {
                            color: 'black',
                            fontWeight: 'bold'
                          },
                        },
                      },
                      '2018-03-29': {
                        customStyles: {
                          container: {
                            backgroundColor: 'white',
                            elevation: 2
                          },
                          text: {
                            color: 'blue',
                          },
                        }
                      },
                      '2018-03-30': {
                        customStyles: {
                          container: {
                            backgroundColor: 'violet',
                            elevation: 4,
                            borderColor: 'red',
                            borderWidth: 5,
                          },
                          text: {
                            marginTop: 3,
                            fontSize: 11,
                            color: 'yellow',
                          },
                        }
                      },
                      '2018-03-31': {
                        customStyles: {
                          container: {
                            backgroundColor: 'green',
                            borderRadius: 0,
                          },
                          text: {
                            color: 'white',
                          },
                        },
                      }}}
                    hideArrows={false}
                  /> */}       
              <TouchableHighlight
                onPress={() => {
                  this.test111();
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>        
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
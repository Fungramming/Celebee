import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import IdolIndicator from './components/IdolIndicator'

// import { WheelPicker, DatePicker, TimePicker } from 'react-native-wheel-picker-android'

import { DatePicker } from 'react-native-wheel-picker-free'

const wheelPickerData = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
const now = new Date()

const dateData = []

for (let i = 1900; i < 2050; i++) {
    dateData.push(i.toString())
}

class Feed extends Component {
  static options() {
    return {
      topBar: {        
        visible: false,
        drawBehind: true,
        language: ''
      }
    };
  }

  constructor(props){
    super(props);
    this.state = {
    }
  }
  onItemSelected(event){
    // do something
  }

  onDateSelected(date){
    // do something
  }

  onTimeSelected(date){
    // do something
  }

  _onPickerConform(){}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>HEADER</Text>
        {/* <DatePicker mode="date" /> */}
        {/* <WheelPicker
           onItemSelected={(event)=>this.onItemSelected(event)}
           isCurved
           data={wheelPickerData}
           style={styles.wheelPicker}/>
         <DatePicker
           initDate={now.toISOString()}
           onDateSelected={(date)=>this.onDateSelected(date)}/>
         <TimePicker
           initDate={now.toISOString()}
           onTimeSelected={(date)=>this.onTimeSelected(date)}/> */}

<DatePicker
    ref={(dialog) => {
        this.datePickerDialog = dialog
    }}
    yearData={dateData}
    selectData={new Date()}
    onChange={this._onPickerConform}
    keepShowModal={false}
    formatCharacter="-"
    cancleText="取消"
    finishText="确定"
    title="出生年月日"
    modalColor="#0000"
/>
        <IdolIndicator></IdolIndicator>
        <Text>feed</Text>
      </View>
    );
  }
}
export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    alignSelf: "flex-start"
  },
  wheelPicker: {
    width: 200,
    height: 150
  }
});


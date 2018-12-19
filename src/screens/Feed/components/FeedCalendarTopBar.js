import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

export default class CustomTopBar extends Component {
  componentDidUpdate() {
    console.log('this.state :', this.props);
  }
  render() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };  
    return (
      <View style={styles.header}>        
        {/* <TouchableWithoutFeedback onPress={() => this._onToggleDate()}> */}
        <TouchableWithoutFeedback>
          <Text style={styles.date}>
            {/* {this.state.chosenDate.toLocaleDateString('ko-KR', options)} */}
            {/* &nbsp;  */}
            2018년 12월 19일
            {/* {this.state.toggleDate ? <Icon name='chevron-up' size={22}/> : <Icon name='chevron-down' size={22}/>} */}
          </Text>        
        </TouchableWithoutFeedback>
        {/* <TouchableOpacity onPress={this.onBackButton}> */}
        <TouchableOpacity>
          <Icon name='layers' style={{paddingRight: 12}} size={22}/>
        </TouchableOpacity>
        <Icon name='search' style={{paddingRight: 12}} size={22}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
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
    paddingLeft: 12,
    height: 360
  }
});
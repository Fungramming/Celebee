import React, { Component } from "react";
import { Platform, SafeAreaView, StatusBar, PixelRatio, ListView, View, Text, StyleSheet, TouchableOpacity, TextInput, DatePickerIOS, FlatList} from "react-native";
import { connect } from 'react-redux'
import FeedCard from '../../components/Card/FeedCard'

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
      toggleDate: false
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({
      chosenDate: newDate
    })
  }

  _onToggleDate() {
    const toggle = !this.state.toggleDate;
    this.setState(prevState => ({
      ...prevState,
      toggleDate: toggle
    }))
  }

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
        {this.state.toggleDate 
        ? 
          <DatePickerIOS
          date={this.state.chosenDate}
          mode='date'
          locale='kor'
          onDateChange={this.setDate}
        />
        : null
        }
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
    marginLeft: 12
    // flex: 1,
    // justifyContent: 'center',
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
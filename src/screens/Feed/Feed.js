import React, { Component } from "react";
import { Platform, SafeAreaView, StatusBar, ScrollView, Dimensions, View, Text, StyleSheet, TouchableOpacity, TextInput, DatePickerIOS, FlatList} from "react-native";
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
          {this.state.toggleDate 
          ? 
            <DatePickerIOS
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
                  // height: 0,
                  // marginBottom: 40,
                  paddingLeft: 29, 
                  borderBottomColor: 'rgb(200, 200, 200)',
                  borderBottomWidth: 2
                }
              }
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
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
    // height: Dimensions.get('window').height,
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
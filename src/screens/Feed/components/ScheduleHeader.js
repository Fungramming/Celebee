import React, { Component } from 'react'
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";
import MultiSelectView from 'react-native-multiselect-view'

class ScheduleHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAlarmModalVisible: false,
      isFeedModalVisible: false,
      isSelectedTime: false,
      oClock: false,
      fiveMinAgo: false,
      times: ['정시', '5분 전', '10분 전', '15분 전', '30분 전', '1시간 전', '2시간 전', '3시간 전', '12시간 전', '1일 전', '2일 전', '1주일 전',]
    };
    this._toggleModal = this._toggleModal.bind(this)
    this.setAlarm = this.setAlarm.bind(this)
    this.selectedTime = this.selectedTime.bind(this)
  }  

  _toggleModal() {
    this.setState(prevState => ({ 
      ...prevState,
      isAlarmModalVisible: !this.state.isAlarmModalVisible 
    }));
  }

  setAlarm() {
    this._toggleModal()
  }
  
  selectedTime() {
    this.setState(prevState => ({ 
      ...prevState,
      isSelectedTime: !this.state.isSelectedTime
    }));
    styles.alarmTxt.color = '#722784'
    console.log('styles.alarmTxt', styles.alarmTxt)
    console.log('this.state.isSelectedTime', this.state.isSelectedTime)
  }

  render() {
    const changeText = {
      color: '#722784',
      fontWeight: 'bold'
    }
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.props.detail} style={styles.feedHeader}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require("../../../../assets/user.png")}
              style={styles.feedHeaderPhoto}
            />
            <View style={styles.feedHeaderTextWrap}>
              <Text style={styles.feedHeaderText}> 스케줄, 기사 제목 영역 </Text>
              <Text style={styles.feedHeaderSubText}> PM 06:00 | 스케줄 장소 및 방송 채널 입력 </Text>
            </View>
            <TouchableOpacity style={styles.feedHeaderAlarm} onPress={this._toggleModal} >
              <Image  
                style={[, { width:30, height: 30}]}
                source={require('../../../../assets/alarm.png')}></Image>
            </TouchableOpacity>

            {/* 알람 모달 */}
            <Modal isVisible={this.state.isAlarmModalVisible} style={{justifyContent: "flex-end", margin: 0}} backdropOpacity={0.2} deviceHeight={Dimensions.get('window').height}>
              <Icon name='x' size={25} style={styles.alarmToggleBtn} onPress={this._toggleModal} />
              {/* <View style={styles.alarmContentsWrap}>
                <TouchableOpacity style={{width: '33%'}} onPress={this.selectedTime}>
                  <Text style={[styles.alarmTxt, this.state.isSelectedTime ? changeText : null]}>정시</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}} onPress={this.selectedTime}>
                  <Text style={[styles.alarmTxt, this.state.isSelectedTime ? changeText : null]}>5분 전</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Text style={styles.alarmTxt}>10분 전</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Text style={styles.alarmTxt}>15분 전</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Text style={styles.alarmTxt}>30분 전</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Text style={styles.alarmTxt}>1시간 전</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Text style={styles.alarmTxt}>2시간 전</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Text style={styles.alarmTxt}>3시간 전</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Text style={styles.alarmTxt}>12시간 전</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Text style={styles.alarmTxt}>1일 전</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Text style={styles.alarmTxt}>2일 전</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Text style={styles.alarmTxt}>1주일 전</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.setAlarm}>
                  <Text style={styles.alarmComp}>확인</Text>
                </TouchableOpacity>
              </View> */}
              <View style={styles.alarmContentsWrap}>
                <MultiSelectView
                  ref='list2'
                  data={this.state.times}
                  inactiveContainerStyle={styles.alarmTxt}
                  // activeTextStyle={styles.activeText}
                  // inactiveTextStyle={styles.inactiveText}
                />
                <TouchableOpacity onPress={this.setAlarm}>
                  <Text style={styles.alarmComp}>확인</Text>
                </TouchableOpacity>
              </View>

            </Modal>

          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  feedHeader: {
    width: Dimensions.get('window').width,
    paddingTop: 10,
    paddingBottom: 17,
    paddingHorizontal: 12,
    flexDirection:'row',
  },
  feedHeaderPhoto: {
    backgroundColor: '#dedede',
    borderRadius: 20,
    marginVertical: 12,
    width: 55,
    height: 55,
    flexDirection: 'row',
  },
  feedHeaderTextWrap: {
    width: 300,
    flexDirection: 'column',
  },
  feedHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginHorizontal: 13,
  },
  feedHeaderSubText: {
    fontSize: 14,
    marginHorizontal: 13,
    marginVertical: 8,
    color: '#505050',
  },
  feedHeaderAlarm: {
    position: 'absolute',
    top: 25,
    right: 0,
    zIndex: 999999,
  },
  alarmToggleBtn: {
    color:'#fff', 
    textAlign: 'right',
    paddingRight: 12,
    paddingBottom: 5, 
    paddingTop: Dimensions.get('window').height - 310, 
    width: Dimensions.get('window').width 
  },
  alarmContentsWrap: {
    backgroundColor: '#f5f5f5', 
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    borderRadius: 15
  },
  alarmTxt: {
    // fontSize: 14,
    // textAlign: 'center',
    // paddingVertical: 20,
    // color: '#252525'
  },
  alarmComp: {
    width: Dimensions.get('window').width -24, 
    backgroundColor: '#722784', 
    textAlign: 'center',
    color: '#fff', 
    fontSize: 18,
    paddingVertical: 10, 
    borderRadius: 15,
    marginTop: 5
  }
})

export default ScheduleHeader

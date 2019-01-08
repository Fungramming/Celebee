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
      oClock: false,
      fiveMinAgo: false,
      times: ['정시', '5분 전', '10분 전', '15분 전', '30분 전', '1시간 전', '2시간 전', '3시간 전', '12시간 전', '1일 전', '2일 전', '1주일 전',]
    };
    this.toggleModal = this.toggleModal.bind(this)
    this.onSwipe = this.onSwipe.bind(this);
    this.setAlarm = this.setAlarm.bind(this)
  }  

  onSwipe() {
    this.setState({ isAlarmModalVisible: false })
  }

  toggleModal() {
    this.setState(prevState => ({ 
      ...prevState,
      isAlarmModalVisible: !this.state.isAlarmModalVisible 
    }));
  }

  setAlarm() {
    this.toggleModal()
  }

  render() {
    const {onPressSchedule, detail, alarmVisible} = this.props
    let toggleSchedule;
    if(detail) toggleSchedule = detail
    else if(onPressSchedule) toggleSchedule = onPressSchedule
    
    return (
      <View>
        <TouchableWithoutFeedback onPress={toggleSchedule} style={styles.feedHeader}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require("../../../../assets/user.png")}
              style={styles.feedHeaderPhoto}
            />
              <View style={styles.feedHeaderTextWrap}>
                <Text style={styles.feedHeaderText}> 스케줄, 기사 제목 영역 </Text>
                <Text style={styles.feedHeaderSubText}> {this.props.date} | 스케줄 장소 및 방송 채널 입력 </Text>
              </View>

            {this.props.alarmVisible === false ? null :
              <TouchableOpacity style={styles.feedHeaderAlarm} onPress={this.toggleModal} >
                <Image style={styles.iconSize} source={require('../../../../assets/alarm.png')}/>
              </TouchableOpacity> 
            }

            {/* 알람 모달 */}
            <Modal 
              onSwipe={ this.onSwipe }
              swipeDirection="down"
              isVisible={this.state.isAlarmModalVisible} 
              style={{position: 'relative', justifyContent: "flex-end", margin: 0}} backdropOpacity={0.2} deviceHeight={Dimensions.get('window').height}>
              <TouchableOpacity style={styles.alarmToggleBtn} onPress={this.toggleModal} >
              </TouchableOpacity>            
              <View style={styles.alarmContentsWrap}>
                <MultiSelectView
                  ref='list2'
                  data={this.state.times}
                  inactiveContainerStyle={styles.alarmTxt}                  
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
    paddingRight: 12,
    paddingBottom: 5, 
    height: Dimensions.get('window').height - 310, 
    paddingLeft: Dimensions.get('window').width,
    alignSelf: 'flex-end' 
  },
  alarmContentsWrap: {
    backgroundColor: '#f5f5f5', 
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    borderRadius: 15
  },
  // alarmTxt: {
  //   fontSize: 14,
  //   textAlign: 'center',
  //   paddingVertical: 20,
  //   color: '#252525'
  // },
  alarmComp: {
    width: Dimensions.get('window').width -24, 
    backgroundColor: '#722784', 
    textAlign: 'center',
    color: '#fff', 
    fontSize: 18,
    paddingVertical: 10, 
    borderRadius: 15,
    marginTop: 5
  },
  iconSize: {
    width: 25,
    height: 25
  }
})

export default ScheduleHeader

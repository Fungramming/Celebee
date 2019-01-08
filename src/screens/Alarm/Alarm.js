import React, { Component } from "react";
import { 
  Dimensions,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux'

import FeedCard from '../../components/Card/FeedCard'
import AlarmComment from './components/AlarmComment'
import ScheduleHeader from '../Feed/components/ScheduleHeader'
import { FEED_LINK_SCREEN } from '../Navigation'
class Alarm extends Component {
  static options() {
    return {
      topBar: {
        title: {
          text: '알림',
        },
        visible: true,
        animate: false,
      }
    };
  }
  
  constructor(props){
    super(props);
    this.state = {
      scheduleTab: true,
      activeTab: false,
      isFeedModalVisible: false,
      scheduleHeaderAlarmVisible: false
    }
    this.onPressSchduleTab = this.onPressSchduleTab.bind(this)
    this.onPressActiveTab = this.onPressActiveTab.bind(this)
    this.onToggleModal = this.onToggleModal.bind(this)
    this.onPressLink = this.onPressLink.bind(this)
  }

  onPressSchduleTab() {
    if (this.state.activeTab) {
      this.setState(prevState => ({
        ...prevState,
        scheduleTab: true,
        activeTab: false,
      }))
    } 
  }

  onPressActiveTab() {
    
    if (this.state.scheduleTab) {
      this.setState(prevState => ({
        ...prevState,
        scheduleTab: false,
        activeTab: true,
      }))
    }
  }

  onToggleModal() {
    this.setState(prevState => ({ 
      ...prevState,
      isFeedModalVisible: !this.state.isFeedModalVisible 
    }));
  }

  onPressLink() {
    this.setState(prevState => ({
      ...prevState,
      isFeedModalVisible: false
    }))

    Navigation.push(this.props.componentId, {
      component: {
        name: FEED_LINK_SCREEN,
        passProps: {
          url: 'https://naver.com',          
        },
        options: { 
          topBar: {
            visible: false, drawBehind: true,  
          },
          bottomTabs: { 
            visible: false, drawBehind: true,
          }
        }
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.alarmHeaderWrap}>
          <View style={[styles.alarmHeader, this.state.scheduleTab ? {borderColor:'#722784', borderBottomWidth: 2,} : null ]}>
            <Text style={styles.alarmHeaderTxt} onPress={this.onPressSchduleTab}>스케줄</Text>
          </View>
          <View style={[styles.alarmHeader, this.state.activeTab ? {borderColor:'#722784', borderBottomWidth: 2,} : null ]} >
            <Text style={styles.alarmHeaderTxt} onPress={this.onPressActiveTab}>활동</Text>
          </View>
        </View>

        {this.state.scheduleTab 
          ?
          <ScrollView
          ref="scrollView"
          style={styles.scheduleTabNewAlarmWrap}
          showsVerticalScrollIndicator={false}>
            <View style={{marginBottom: 15}}>
              <Text style={styles.scheduleTabNewAlarm}>새로운 알림</Text>
              <ScheduleHeader onPressSchedule={this.onToggleModal} alarmVisible={this.state.scheduleHeaderAlarmVisible}/>
            </View>
            <View>
              <Text style={styles.scheduleTabNewAlarm}>지난 알림</Text>
              <ScheduleHeader onPressSchedule={this.onToggleModal} alarmVisible={this.state.scheduleHeaderAlarmVisible}/>
            </View>
          </ScrollView>
          
          : 
          <ScrollView
          ref="scrollView"
          style={styles.scheduleTabNewAlarmWrap}
          showsVerticalScrollIndicator={false}>
            <View style={{marginBottom: 15}}>
              <Text style={styles.scheduleTabNewAlarm}>새로운 알림</Text>
              <AlarmComment onPressSchedule={this.onToggleModal}/>
            </View>
            <View>
              <Text style={styles.scheduleTabNewAlarm}>지난 알림</Text>
              <AlarmComment onPressSchedule={this.onToggleModal}/>
            </View>
          </ScrollView>
        }

        {/* 피드 모달 */}
        <Modal isVisible={this.state.isFeedModalVisible} style={{justifyContent: "center", margin: 0}} deviceHeight={Dimensions.get('window').height}>
          <Text style={styles.feedToggleBtn} onPress={this.onToggleModal} />
          <View>
            <FeedCard 
              onLink={this.onPressLink} 
              onClose={this.onToggleModal}
              componentId={this.props.componentId} 
              alarmVisible={this.state.scheduleHeaderAlarmVisible}
            />
          </View>
        </Modal>

      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    isFeedModalVisible: state.feed.isFeedModalVisible
  }
}

export default connect(mapStateToProps)(Alarm)

const styles = StyleSheet.create({
  container: {
    // width: Dimensions.get('window').width,
    // flex: 1,
    // flexDirection:'row',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },
  alarmHeaderWrap: {
    flexDirection: 'row',
  },
  alarmHeader: {
    borderBottomWidth: 0.5,
    borderColor: '#888',
    width: Dimensions.get('window').width / 2,
  },
  alarmHeaderTxt: {
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 14,
  },
  scheduleTabNewAlarmWrap: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  scheduleTabNewAlarm: {
    fontSize: 18,
    fontWeight: '500',
  },
  feedToggleBtn: {
    position: 'absolute',
    top: 0,
    height: Dimensions.get('window').height, 
    width: Dimensions.get('window').width 
  },
});
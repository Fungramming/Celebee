import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'

class ScheduleHeader extends Component {
  constructor(props){
    super(props)

  }  

  render() {
    return (
      <View style={styles.feedHeader}>
        <TouchableWithoutFeedback onPress={this.props.detail}>
          <View>
            <Text style={styles.feedHeaderTitle}> 스케줄, 기사 제목 영역 </Text>
            <Text style={styles.feedHeaderSubText}> PM 06:00 | 스케줄 장소 및 방송 채널 입력 </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  feedHeader: {
    height: 72,
    paddingTop: 14,
    paddingBottom: 14,
    marginHorizontal: -17,
    marginBottom: 8,
    borderTopColor: 'rgb(200, 200, 200)', 
    borderTopWidth: 0.25,
    borderBottomColor: 'rgb(200, 200, 200)', 
    borderBottomWidth: 0.25,
    position: 'relative',
  },
  feedHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 24,
    marginBottom: 5,
    marginHorizontal: 13,
  },
  feedHeaderSubText: {
    fontSize: 14,
    height: 24,
    marginHorizontal: 13,
    color: '#505050',
  },
})

export default ScheduleHeader

import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

class ScheduleHeader extends Component {
  constructor(props){
    super(props)

  }  

  render() {
    return (
      <View>
        {/* <TouchableWithoutFeedback style={{widht: Dimensions.get('window').width}} onPress={this.props.detail}> */}
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
              <TouchableOpacity>
                <Icon style={styles.feedHeaderAlarm} name='bell' size={25}/>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        {/* </TouchableWithoutFeedback> */}
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
    right: 0
  }
})

export default ScheduleHeader

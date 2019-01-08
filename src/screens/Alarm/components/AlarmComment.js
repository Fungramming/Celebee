import React, { Component } from 'react'
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";

class AlarmComment extends Component {
  constructor(props){
    super(props)
    this.state = {};
  }  

  render() {
    return (
      <View>
        <TouchableWithoutFeedback style={styles.alarmCommentHeader}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require("../../../../assets/user.png")}
              style={styles.alarmCommentHeaderPhoto}
            />
            <View style={styles.alarmCommentHeaderTextWrap}>
              <Text style={styles.alarmCommentHeaderText}> ~ 님이 내 댓글을 좋아합니다.</Text>
            </View>

            {/* <Modal></Modal> */}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  alarmCommentHeader: {
    width: Dimensions.get('window').width,
    paddingTop: 10,
    paddingBottom: 17,
    paddingHorizontal: 12,
    flexDirection:'row',
  },
  alarmCommentHeaderPhoto: {
    backgroundColor: '#dedede',
    borderRadius: 20,
    marginVertical: 12,
    width: 55,
    height: 55,
    flexDirection: 'row',
  },
  alarmCommentHeaderTextWrap: {
    width: 300,
    flexDirection: 'column',
  },
  alarmCommentHeaderText: {
    fontSize: 16,
    marginHorizontal: 13,
    marginVertical: 28,
    color: '#505050',
  },
})

export default AlarmComment

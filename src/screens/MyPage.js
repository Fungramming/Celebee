import React, { Component } from 'react'
import { Text, View,StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import MyProfile from '../components/MyProfile'
import MyIdol from '../components/MyIdol'
import Icon from 'react-native-vector-icons/AntDesign';

export default class MyPage extends Component {
  render() {
    return (
      <View style={styles.constainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditMyProfile')}>
          <MyProfile></MyProfile>
        </TouchableOpacity>
        <View style={styles.idolSettingBtn}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditIdol')}>
            <Text>편집</Text>
          </TouchableOpacity>
        </View>
        <MyIdol></MyIdol>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex:1,
    alignItems: 'flex-start'
  },
  settingBtn: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  idolSettingBtn: {
    position: 'absolute',
    top: 130,
    right: 10,
    zIndex: 1
  },
  settingBtnIcon: {
    fontSize: 24
  }
})
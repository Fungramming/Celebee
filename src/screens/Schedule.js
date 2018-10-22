import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Container, Content, Thumbnail, Header, Left, Right, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

class Schedule extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{position: "absolute", top: 0}}>스케쥴</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('MyPage')}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="user" size={350} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
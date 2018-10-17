import React, { Component } from 'react'
import { Text,TextInput, View, StyleSheet, Icon } from 'react-native'

export default class UserProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.photo}></Text>
        <TextInput style={styles.nickName}></TextInput>
        <Icon android="md-menu"></Icon>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        padding: 15,
        flex:1,
        flexDirection: 'row',
    },  
    photo: {
        backgroundColor: '#dedede',
        borderRadius: 50,
        marginRight: 20,
        width: 80,
        height: 80
    },
    nickName: {
        borderColor: '#dedede',
        borderWidth: 2,
        marginTop: 15,
        padding: 10,
        width: 150,
        height: 40
    }
})
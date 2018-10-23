import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from 'native-base';

class SelectIdolList extends Component {
  state = {
    toggle: true
  }

  _onPress() {
    const newState = !this.state.toggle;
    this.setState({toggle: newState})
  }

  render() {

    const {toggle} = this.state;
    const textValue = toggle ? "팔로우" : "팔로잉";
    const buttonBg = toggle ? styles.followBtn : styles.followingBtn

    return (
      <View style={styles.container}>
        <View style={styles.idolCard}>
          <Image
            source={require("../../assets/user.png")}
            style={styles.idolPhoto}
          />
          <View style={styles.idolTextGroup}>
            <Text style={styles.idolName}>{this.props.name}</Text>
            <Text style={styles.followingNum}>198,734명이 팔로우 합니다.</Text>
          </View>
          <View>
            <TouchableOpacity style={buttonBg} onPress={ () => this._onPress() }>
              <Text style={{color:'#fff', fontSize: 16}}>{textValue}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default SelectIdolList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  idolCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  idolPhoto: {
      backgroundColor: '#dedede',
      borderRadius: 38,
      marginBottom: 10,
      marginRight: 15,
      width: 75,
      height: 75
  },
  idolTextGroup: {
    flexDirection: 'column',
    textAlign: "left",
    marginTop: 10,
    marginRight: 15,
  },
  idolName: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 5
  },
  followingNum: {
    fontSize: 12,
  },
  followingBtn: {
    marginTop: 12,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: '#722784',
    borderRadius: 5,
  },
  followBtn: {
    marginTop: 12,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: '#dedede',
    borderRadius: 5,
  }
});
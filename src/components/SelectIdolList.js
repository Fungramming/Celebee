import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from 'native-base';

class SelectIdolList extends Component {
  // constructor(props) {
  //   super(props);
  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.state = {
  //       idols : ds.cloneWithRows(['BTS','뉴이스트','트와이스','세븐틴','엑소','워너원','비투비'])            
  //   }
  // }

  render() {
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
            <Button full rounded primary style={styles.followingBtn} onPress={this.goToMain}>
              <Text style={{color:'#fff', fontSize: 16}}>팔로잉</Text>
            </Button>
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
    marginBottom: 10
  },
  followingNum: {
    fontSize: 12,
  },
  followingBtn: {
    marginTop: 10,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: '#722784',
    borderRadius: 10,
  }
});
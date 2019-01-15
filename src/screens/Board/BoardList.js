import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Navigation } from 'react-native-navigation'

import BoardCard from "../../components/Card/boardCard";
import { ALARM_SCREEN, BOARD_WRITE_SCREEN, BoardWriteScreen} from '../Navigation'

class Board extends Component {
  static options(passProps) {
    console.log('@!passProps', passProps)
    return {
      topBar: {
        title: {
          text: passProps.text,
        },
        visible: true,
        animate: false,
        rightButtons: [
          {
            id: 'toWriteScreen',
            icon: require('../../../assets/board.png'),
            testID: 'toWriteScreen',
            disableIconTint: true,
            showAsAction: 'always',
            // buttonFontSize: 10,
            // buttonFontWeight: '600',
            color: '#262626',
            weight: '100',
            enabled: true,
            disabledColor: 'grey'
          },
          {
            id: 'toAlarmScreen',
            icon: require('../../../assets/alarm.png'),
            testID: 'toAlarmScreen',
            disableIconTint: true,
            showAsAction: 'always',
            // buttonFontSize: 10,
            // buttonFontWeight: '600',
            color: '#262626',
            weight: '100',
            enabled: true,
            disabledColor: 'grey'
          },
        ]
      }
    };
  }

  constructor(props){
    super(props)
    Navigation.events().bindComponent(this);
    this.state = {
      testData: [1,2,3,4,5],
      refreshing: false
    }

    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  navigationButtonPressed({ buttonId }) {
    // will be called when "buttonOne" is clicked
    if(buttonId == "toAlarmScreen"){
      this.onAlarmPress()
    } 
    if (buttonId == "toWriteScreen") {
      console.log('@!$!%@#$!##$!clickclick')
      this.onWritePress()
      // BoardWriteScreen()
    }
  }

  onAlarmPress() {
    Navigation.push(this.props.componentId, {
      component: {
        name: ALARM_SCREEN
      }
    })
  }

  onWritePress() {
    Navigation.push(this.props.componentId, {
      component: {
        name: BOARD_WRITE_SCREEN,       
      }
    })
  }

  onEndReached() {
    let newA = this.state.testData  
  }

  onRefresh() {
    console.log('refresh111111111111111111111', 111111111111111111111111111111111)
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.testData}
          initialNumToRender={20}
          onEndReachedThreshold={0.2}
          onEndReached={this.onEndReached}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <BoardCard data={item}/>
              )
          }}
          keyExtractor={(index) => index.toString()}
        />        
      </View>
    );
  }
}

export default Board;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
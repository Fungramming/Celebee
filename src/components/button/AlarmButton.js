import React, { Component } from "react";
import { 
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Navigation } from 'react-native-navigation'

import { ALARM_SCREEN } from '../../screens/Navigation'

class Alarm extends Component {

  constructor(props) {
    super(props);
    this.onPressAlarm = this.onPressAlarm.bind(this)
  }

  onPressAlarm() {
    Navigation.push(this.props.componentId, {
      component: {  
        name: ALARM_SCREEN,                
      },     
    })  
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPressAlarm}>
          <Image style={{marginLeft: 10}} 
            source={require('../../../assets/alarm.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}


export default Alarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
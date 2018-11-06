import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

class LoadingSpinner extends Component {
  state = { animating: true }
  
  // closeActivityIndicator = () => setTimeout(() => this.setState({
  // animating: false }), 5000)
  
  // componentDidMount = () => this.closeActivityIndicator()

  render() {
    const animating = this.state.animating
    return (
      <View style = {{opacity: (this.props.show) ? 1: 0 }}>
        <ActivityIndicator
            animating = {animating}
            // color = '#fff'
            size = "large"/>
      </View>
    )
  }
}
export default LoadingSpinner;
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
      <View style = {styles.container}>
        <ActivityIndicator
            animating = {animating}
            // color = '#fff'
            size = "large"
            style = {styles.activityIndicator}/>
      </View>
    )
  }
}
export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
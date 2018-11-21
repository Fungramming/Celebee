import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'

// import { USER_KEY } from './config'

export default class Initialising extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // try {
    // //   const user = await AsyncStorage.getItem(USER_KEY)
    // //   console.log('user: ', user)
    //   if (true) {
    //     goHome()
    //   } else {
    //     goToLogin()
    //   }
    // } catch (err) {
    //   console.log('error: ', err)
    //   goToLogin()
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

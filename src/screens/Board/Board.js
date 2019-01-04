import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";

import BoardCard from "../../components/Card/boardCard";

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      testData: [1,2,3,4,5],
      refreshing: false
    }

    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
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
import React, { Component } from 'react'
import { 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  FlatList,
  Dimensions, 
  TouchableOpacity 
} from 'react-native'

export default class boardCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      testData: [1,2,3],
      refreshing: false,
      token: this.props.token      
    }    
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/user.png")}
            style={styles.photo}
            />
          <Text style={styles.nickname}>트와이스사나</Text>
          <Text style={styles.time}> 1시간 전</Text>
        </View>
        <Text style={styles.comment}>commentttttttttttttttttttttttttt</Text>
        <FlatList
            style={styles.imageBox}
            data={this.state.testData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Text style={styles.image}>{item}</Text>                              
                )
            }}
            keyExtractor={(index) => index.toString()}
          />
          <View style={styles.footer}>
            <View style={styles.feedBottomRight}>
              <TouchableOpacity style={{paddingRight: 22}}>
                <View style={{flexDirection:"row"}}>
                  <Image style={styles.iconSize} source={require('../../../assets/like.png')} />
                  <Text>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressComment}>            
                <View style={{flexDirection:"row"}}>                            
                  <Image style={styles.iconSize} source={require('../../../assets/comment.png')} />
                  <Text>1</Text>
                </View>  
              </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: Dimensions.get('window').width,
    marginBottom: 15,
    paddingHorizontal: 15
  },
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  nickname: {
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 20
  },
  time: {
    marginLeft: "auto"
  },
  photo: {
    backgroundColor: '#dedede',
    borderRadius: 20,
    marginVertical: 12,
    width: 55,
    height: 55,
    flexDirection: 'row',
  },
  comment: {
    width: "100%"
  },
  imageBox: {
    width: Dimensions.get('window').width - 30,
  },
  image: {
    backgroundColor: '#dedede',
    width: (Dimensions.get('window').width - 30) / 3 - 3,
    height: (Dimensions.get('window').width - 30) / 3 - 3,
    marginRight: 3
  },
  footer: {
    paddingVertical: 10
  },
  feedBottomRight: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  iconSize: {
    width: 25,
    height: 25
  }
})
import React, { Component } from 'react'
import { Text, View, ListView, StyleSheet, Dimensions,TouchableOpacity, Image, FlatList } from 'react-native'
import SelectIdolList from '../components/SelectIdolList'

export default class MyIdol extends Component {
    constructor(props) {
        super(props);
        this.state = {
          idolList: [],
        }
    }

    componentDidMount() {
      this.getIdolList()
    }
    
    getIdolList =() => {
      fetch('http://celebee-env-1.gimjpxetg2.ap-northeast-2.elasticbeanstalk.com/api/v1.0/idols/')
      .then( (res) => res.json() )
      .then( (json) => {
        this.setState({ idolList: json.idols })
      })
      .catch( (err) => {
        console.log('err :', err);
      })
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.myIdol}>

              <Text style={styles.subTitle}>내가 팔로우한 아이돌</Text>
              <Text style={{position:"absolute", top: 25, right: 25}}>접기</Text>
              <View style={styles.followList}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.idolList}
                  renderItem={({item}) => {
                    return <SelectIdolList name={item.idol_name} followNum={item.total_followers}></SelectIdolList>
                  }}
                  keyExtractor={(item, index) => index.toString()} >
                </FlatList>
              </View>

              <Text style={styles.subTitle}>내가 팔로우하지 않는 아이돌</Text>
              <View style={styles.unfollowList}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.idolList}
                  renderItem={({item}) => {
                    return <SelectIdolList name={item.idol_name} followNum={item.total_followers}></SelectIdolList>
                  }}
                  keyExtractor={(item, index) => index.toString()} >
                </FlatList>
              </View>

            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      height: Dimensions.get('window').height,
    },
    myIdol: {
      width: Dimensions.get('window').width,
      backgroundColor: '#fff',
    },
    subTitle: {
      marginTop: 20,
      marginLeft: 15,
      marginBottom: 20,
      fontWeight: '600',
      fontSize: 20
    },
    followList: {
      height: '30%',
      // height: 0
      
    },
    unfollowList: {
      height: '50%',
    },
    idolCard: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 0.3,
    },
    idolPhoto: {
        backgroundColor: '#dedede',
        borderRadius: 25,
        marginBottom:10,
        width: 60,
        height: 60
    },
    idolName: {
        width: 80,
        textAlign:"center"
    },
    editBtn: {
        position: "absolute",
        top: 0,
        right: 15
    }
})
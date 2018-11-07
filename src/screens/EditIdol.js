import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions,TouchableOpacity, Image, FlatList } from 'react-native'
import SelectIdolList from '../components/SelectIdolList'


export default class MyIdol extends Component {
  constructor(props) {
        super(props);
        this.state = {
          idolList: [],
          toggleIdol: true
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



    _onToggle() {
      const toggle = !this.state.toggleIdol;
      this.setState({toggleIdol: toggle})
    }

    render() {

      const {toggleIdol} = this.state;
      const toggleValue = toggleIdol ? "접기" : "펼치기";

        return (
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.myIdol}>

              <Text style={styles.subTitle}>내가 팔로우한 아이돌</Text>
              <TouchableOpacity style={{position:"absolute", top: 25, right: 25}} onPress={ () => this._onToggle() }>
                <Text>{toggleValue}</Text>
              </TouchableOpacity>
              <View style={ this.state.toggleIdol ? styles.followList : styles.followListFalse }>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.idolList}
                  renderItem={({item}) => {
                    return <SelectIdolList name={item.idol_name} followNum={item.total_followers}></SelectIdolList>
                  }}
                  keyExtractor={(item, index) => index.toString()} >
                </FlatList>
                {/* { 
                  this.state.idolList.map((item, index) => (
                    <SelectIdolList name={item.idol_name} followNum={item.total_followers} key={item.id}></SelectIdolList>
                  ))
                } */}
              </View>

              <Text style={styles.subTitle}>내가 팔로우하지 않는 아이돌</Text>
              <View style={this.state.toggleIdol ? styles.unfollowList : styles.unfollowListFalse}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.idolList}
                  renderItem={({item}) => {
                    return <SelectIdolList name={item.idol_name} followNum={item.total_followers}></SelectIdolList>
                  }}
                  keyExtractor={(item, index) => index.toString()} >
                </FlatList>
                {/* { 
                  this.state.idolList.map((item, index) => (
                    <SelectIdolList name={item.idol_name} followNum={item.total_followers} key={item.id}></SelectIdolList>
                  ))
                } */}
              </View>

            </ScrollView>
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
      // height: '30%',
    },
    followListFalse: {
      height: 0
    },
    unfollowList: {
      // height: '50%',
      marginBottom: 15
    },
    unfollowListFalse: {
      // height: '80%',
      marginBottom: 15
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
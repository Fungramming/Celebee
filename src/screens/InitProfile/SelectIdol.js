import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Button, FlatList, Dimensions } from 'react-native'
import SelectIdolList from '../../components/Card/IdolCard'
import {MainApp} from '../Navigation'

class SelectIdol extends Component {
  constructor(props) {
    super(props);
    this.state = {
        idolList: [],
        // sortList: []
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
      console.log('json.idols :', json.idols);
      // this.setState({ sortList: json.idols.sort() })
      // this.setState({ sortList: json.idols.sort((a, b) => {
      //   return a.idol_name < b.idol_name ? -1 : a.name > b.name ? 1 : 0;
      // }) })
      console.log('this.state.sortList :', this.state.sortList);
    })
    .catch( (err) => {
      console.log('err :', err);
    })
  }

  goToMain = () => {
    MainApp()
  }

  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{marginHorizontal: 12,}}showsVerticalScrollIndicator={false}>
          <StatusBar 
            barStyle="dark-content"
          />

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerText}>좋아하는 아이돌을 팔로우해보세요!</Text>
            <Text style={styles.headerText}>스케줄과 클립, 뉴스까지 받아보실 수 있습니다.</Text>
          </View>
          <Text style={styles.selectHeaderText}>내 최애 아이돌 선택하기</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Text style={styles.selectFilterText}>인기순</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.selectFilterText}>가나다순</Text>
            </TouchableOpacity>
          </View>
          { this.state.idolList.map((item, index) => (
              <SelectIdolList name={item.idol_name} followNum={item.total_followers} key={item.id}></SelectIdolList>
            ))}
        </ScrollView>        
        <TouchableOpacity onPress={() => this.goToMain()}>
            <Text style={styles.selectBtn}>Celebee 시작하기</Text>
        </TouchableOpacity> 
      </View>
    );
  }
}

export default SelectIdol;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe'
  },
  headerTextWrap: {
    marginTop: 60,
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5
  },
  // selectHeaderTextWrap: {
  //   marginTop: 35,
  // },
  selectHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  selectFilterText: {
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 12,
  },
  selectBtn: {
    paddingTop: 20,
    paddingBottom: 20,
    color:'#fff',
    textAlign: 'center',
    fontSize: 20,
    width: Dimensions.get('window').width,
    backgroundColor: '#722784'
  }
});
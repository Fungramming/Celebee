import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Button, FlatList, Dimensions } from 'react-native'
import SelectIdolList from '../../components/Card/IdolCard'
import { connect } from "react-redux";

import {MainApp} from '../Navigation'

class SelectIdol extends Component {
  constructor(props) {
    super(props);
    this.state = {
        idolList: [],
        sortByKorean: false,
    }
  }

  componentDidMount() {
    this.getIdolList()
  }
  
  getIdolList =() => {
    fetch('http://celebee-env-1.gimjpxetg2.ap-northeast-2.elasticbeanstalk.com/api/v1.0/idols/')
    .then( (res) => res.json() )
    .then( (json) => {
      this.setState({ 
        idolList: json.idols.sort( (a,b) => b.total_followers - a.total_followers ),
      })
      console.log('this.state.idolList :', this.state.idolList);
    })
    .catch( (err) => {
      console.log('err :', err);
    })
  }

  SortByFollower() {
    this.setState({sortByKorean: false})
    this.state.idolList.sort( (a,b) => b.total_followers - a.total_followers )
  }

  SortByKoran() {
    this.setState({sortByKorean: true})
    this.state.idolList.sort( (a,b) => (a.idol_name < b.idol_name) ? -1 : ( (a.idol_name > b.idol_name) ? 1 : 0 ) )
  }

  goToMain = () => {
    MainApp()
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{marginHorizontal: 12,}} showsVerticalScrollIndicator={false}>
          <StatusBar 
            barStyle="dark-content"
          />

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerText}>좋아하는 아이돌을 팔로우해보세요!</Text>
            <Text style={styles.headerText}>스케줄과 클립, 뉴스까지 받아보실 수 있습니다.</Text>
          </View>
          <Text style={styles.selectHeaderText}>내 최애 아이돌 선택하기</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={ () => this.SortByFollower() }>
              <Text style={styles.selectFilterText}>인기순</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.SortByKoran() }>
              <Text style={styles.selectFilterText}>가나다순</Text>
            </TouchableOpacity>
          </View>
            {this.state.idolList.map((item, index) => (
              <SelectIdolList name={item.idol_name} followNum={item.total_followers} key={item.id} id={item.id}></SelectIdolList>
            ))} 
        </ScrollView>        
        <View style={styles.selectBtn}>
          <Button title="셀레비 시작하기" color='#fff' onPress={() => this.goToMain()}/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    followIdol: state.user.followIdol,
  }
}

export default connect(mapStateToProps)(SelectIdol);

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
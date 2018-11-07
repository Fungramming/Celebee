import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Button, FlatList, Dimensions } from 'react-native'
import SelectIdolList from '../components/SelectIdolList'
import { connect } from "react-redux";
import { initUserInfo } from "../actions/users";

const mapDispatchToProps = dispatch => {
  return {
      add: (userInfo) => {
          dispatch(addUserInfo(userInfo))
      }
  }
}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
  }
}

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
    console.log('this.props :', this.props);
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
    this.props.navigation.navigate('AppTabNavigator')
  }

  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
          {/* <FlatList
            // showsVerticalScrollIndicator={false}
            // data={this.state.sortList}
            data={this.state.idolList}
            renderItem={({item}) => {
              return <SelectIdolList name={item.idol_name} followNum={item.total_followers}></SelectIdolList>
            }}
            keyExtractor={(item, index) => index.toString()} >
          </FlatList> */}
        </ScrollView>        
        <View style={styles.selectBtn}>
          <Button title="선택완료" color='#fff' onPress={() => this.goToMain()}/>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectIdol);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
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
    marginLeft: -24,
    paddingTop: 15,
    paddingBottom: 15,
    width: Dimensions.get('window').width,
    backgroundColor: '#722784'
  },
});
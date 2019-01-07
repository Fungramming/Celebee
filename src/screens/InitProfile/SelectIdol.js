import React, { Component } from 'react'
import { Image, Text, SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Button, FlatList, Dimensions } from 'react-native'
import SelectIdolList from '../../components/Card/IdolCard'
import { connect } from "react-redux";
import { fetchIdolRequest } from '../../actions/users'
import {MainApp} from '../Navigation'

class SelectIdol extends Component {
  constructor(props) {
    super(props);
    this.state = {
        idol_list: this.props.idol_list,
        follow_idol_id: this.props.follow_idol_id,
        sortByKorean: false,
        token: this.props.token,
        // toggle: this.props.idolToggle,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ( prevProps.idol_list.length !== this.props.idol_list.length) {
        this.setState(prevState => ({
            ...prevState,
            idol_list: this.props.idol_list,
            follow_idol_id: this.props.follow_idol_id    
        }))  
      }
  }

  onFetchIdolRequest(id, index) {
    let updatedIdolList = this.state.idol_list

    // 아이돌 선택 시 팔로워 수 반영
    if (!updatedIdolList[index].toggle){
      updatedIdolList[index].total_followers = updatedIdolList[index].total_followers + 1
    } else {
      updatedIdolList[index].total_followers = updatedIdolList[index].total_followers - 1
    }

    updatedIdolList[index].toggle = !updatedIdolList[index].toggle

    this.setState(prevState => ({
      ...prevState,
      idol_list: updatedIdolList
    }))

    // this.state.idol_list[index].toggle = !this.state.idol_list[index].toggle
    const followOrNot = updatedIdolList[index].toggle ? 1 : 0
    // const id = this.props.id

    let payload = {
      follow: followOrNot,
      idol_id: id,
      token: this.state.token
    }
  
    this.props.fetchIdolRequest(payload)

    this.setState(prevState => ({
      ...prevState,
      idol_list: this.state.idol_list
    }))

  }

  SortByFollower() {
    this.setState({sortByKorean: false})
    this.state.idol_list.sort( (a,b) => b.total_followers - a.total_followers )
  }

  SortByKoran() {
    this.setState({sortByKorean: true})
    this.state.idol_list.sort( (a,b) => (a.idol_name < b.idol_name) ? -1 : ( (a.idol_name > b.idol_name) ? 1 : 0 ) )
  }

  goToMain = () => {
    MainApp()
  }

  render() {

    const toggle = this.props.toggleValid
    const textValue = toggle ? "팔로우" : "팔로잉";
    const buttonBg = toggle ? styles.followBtn : styles.followingBtn

    return (
      <View style={styles.container}>
        <SafeAreaView>
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
              {/* {this.state.idolList.map((item, index) => (
                <SelectIdolList name={item.idol_name} followNum={item.total_followers} toggleValid={true} key={item.id} id={item.id}></SelectIdolList>
              ))}  */}

                {this.state.idol_list.map((item, index) => (
                  <View style={styles.idolCard}>
                    <Image
                      source={require("../../../assets/user.png")}
                      style={styles.idolPhoto}
                    />
                    <View style={styles.idolTextGroup}>
                      <Text style={styles.idolName}>{item.idol_name}</Text>
                      <Text style={styles.followingNum}>{item.total_followers}명이 팔로우합니다.</Text>
                    </View>
                    <View>
                      {/* <TouchableOpacity style={item.toggle ? styles.followBtn : styles.followingBtn} onPress={ () => this.onFetchIdolRequest() }> */}
                      <TouchableOpacity style={item.toggle ? styles.followingBtn : styles.followBtn} key={item.id} onPress={ () => this.onFetchIdolRequest(item.id, index) }>
                        <Text style={{color:'#fff', fontSize: 16}}>{textValue}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

          </ScrollView>        
          <TouchableOpacity onPress={() => this.goToMain()}>
              <Text style={styles.selectBtn}>Celebee 시작하기</Text>
          </TouchableOpacity> 
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    follow_idol_id: state.user.userInfo.follow_idol_id,
    idol_list: state.user.userInfo.idol_list
    // idolToggle: state.user.idolToggle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchIdolRequest: (userIdol) => {
      dispatch(fetchIdolRequest(userIdol))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectIdol);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe'
  },
  // headerTextWrap: {
  //   marginTop: 60,
  // },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5
  },
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
    marginTop: 10,
    // paddingTop: 20,
    // paddingBottom: 20,
    color:'#fff',
    textAlign: 'center',
    fontSize: 20,
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: '#722784'
  },


  idolCard: {
    flexDirection: 'row',
    marginBottom: 5
  },
  idolPhoto: {
    backgroundColor: '#dedede',
    borderRadius: 25,
    marginBottom: 10,
    marginRight: 15,
    width: 73,
    height: 73
  },
  idolTextGroup: {
    flexDirection: 'column',
    textAlign: "left",
    marginTop: 15,
    marginRight: 15,
    width: 140,
  },
  idolName: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 5
  },
  followingNum: {
    fontSize: 12,
  },
  followingBtn: {
    marginTop: 15,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: '#722784',
    borderRadius: 5,
  },
  followBtn: {
    marginTop: 15,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: '#dedede',
    borderRadius: 5,
  }

});
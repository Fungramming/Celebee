import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions,TouchableOpacity, AsyncStorage, Image, FlatList } from 'react-native'
import SelectIdolList from '../../components/Card/IdolCard'
import { connect } from "react-redux";
import { config } from '../../actions/types'

class EditIdol extends Component {
  constructor(props) {
        super(props);
        this.state = {
          toggleIdol: true,
          followIdol: this.props.userInfo.followIdol,
          unfollowIdol: this.props.userInfo.unfollowIdol,
          // userToken: ''
        }
    }

    // componentDidMount() {
    //   this.getIdolList()
    //   console.log('this.state.followIdol :', this.state.followIdol);
    // }
    
    // getIdolList = async() => {
    //   const userToken = await AsyncStorage.getItem('userToken')
    //   this.state.userToken = userToken

    //   fetch( config + 'user/mypage/', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         'token': userToken,
    //     }),
    //   }).then((data) => data.json())
    //   .then( (json) => {
    //     this.setState({followIdol: json.result.follow_idol_id})
    //     this.setState({unfollowIdol: json.result.unfollow_idol_id})
    //     console.log('this.state.followIdol :', this.state.followIdol);
    //   }).catch((error) => {
    //     console.log('error :', error);
    //   });
    // }

    _onToggle() {
      const toggle = !this.state.toggleIdol;
      this.setState({toggleIdol: toggle})
    }

    render() {
      const {toggleIdol} = this.state;
      const toggleValue = toggleIdol ? "접기" : "펼치기";
      const token = this.state.userToken
        return (
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.myIdol}>

              <Text style={styles.subTitle}>내가 팔로우한 아이돌</Text>
              <TouchableOpacity style={{position:"absolute", top: 25, right: 25}} onPress={() => this._onToggle()}>
                <Text>{toggleValue}</Text>
              </TouchableOpacity>
              <View style={ this.state.toggleIdol ? styles.followList : styles.followListFalse }>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.followIdol}
                  renderItem={({item}) => {
                    const toggleFalse = false
                    return <SelectIdolList name={item.idol_name} followNum={item.total_followers} toggleFalse={toggleFalse} id={item.id} token={token}></SelectIdolList>
                  }}
                  keyExtractor={(item, index) => index.toString()} >
                </FlatList>
              </View>

              <Text style={styles.subTitle}>내가 팔로우하지 않는 아이돌</Text>
              <View style={this.state.toggleIdol ? styles.unfollowList : styles.unfollowListFalse}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.unfollowIdol}
                  renderItem={({item}) => {
                    return <SelectIdolList name={item.idol_name} followNum={item.total_followers} id={item.id} token={token}></SelectIdolList>
                  }}
                  keyExtractor={(item, index) => index.toString()} >
                </FlatList>
              </View>

            </ScrollView>
          </View>
        )
    }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    idolToggle: state.user.idolToggle
  }
}


export default connect(mapStateToProps)(EditIdol)

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
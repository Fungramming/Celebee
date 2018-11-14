import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign';

import { connect } from "react-redux";
import { addUserInfo } from "../actions/users";
// import { relative } from 'path';

 class NicknameInput extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userInfo: this.props.userInfo,    
      nicknameInputValid: true,
      showValid: false,
      controlButton: true,

    }
  }
  componentDidMount(){
    this.textInput.focus()
  }

  async checkNickname(text) {
    await fetch('http://celebee-env-1.gimjpxetg2.ap-northeast-2.elasticbeanstalk.com/api/v1.0/user/nickname/', {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'nickname': text,
        }),
      })
    .then((res) => {
      this.setState({showValid: true})
      this.setState(prevState => ({ 
        userInfo: {
          ...prevState.userInfo,
          nickname : text,
        }
      }))
      if( this.state.userInfo.nickname === '' || res.ok === false ){
        this.setState({checkValid: false})
        this.setState({controlButton: true}) 
      } else if (res.ok === true) {
        this.setState({checkValid: true}) 
        this.setState({controlButton: false})
      }
    })
  }

  onInputFocus() {    
    this.setState({
      nicknameInputValid: false
    })
    this.textInput.focus()
    console.log('this.textInput :', this.textInput.isFocused());
  }

  render() {
    return (
      <View style={styles.nicknameView}>
        <Text style={styles.nicknameTitle}>닉네임 설정</Text>
        <View>
          <TextInput 
            ref={(input) => { this.textInput = input; }}
            style={styles.nicknameInput} 
            maxLength={12}
            placeholder="12자 이내의 닉네임을 설정해 주세요"
            onChangeText={(text) => this.props.checkNickname(text)}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.nicknameValueBox} onPress={this.onInputFocus.bind(this)}>
            <Text style={this.state.nicknameInputValid ? styles.onText : styles.offText}>{this.state.userInfo.nickname}</Text>
          </TouchableOpacity>
        </View>        
        <View style={[this.props.showValid ? styles.showValid : styles.hideValid, !this.props.nickname ? {display:"none"}: '']}>
          <Text style={this.props.checkValid ? styles.greenText : styles.redText}>
            {this.props.checkValid ? '사용가능한 닉네임 입니다.' : '이미 사용중인 닉네임 입니다.'}
          </Text>
        </View>
        <TouchableOpacity style={styles.closeCircle} onPress={this.clearText}>
            <Icon name="closecircleo" size={24}></Icon>
        </TouchableOpacity> 
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
  }
}
const mapDispatchToProps = dispatch => {
  return {
      add: (userInfo) => {
          dispatch(addUserInfo(userInfo))
      }
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(NicknameInput);

const styles = StyleSheet.create({
  nicknameView: {
    position: 'relative',
    flex: 3,
    alignSelf: 'stretch',
  },
  nicknameTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 15
  },
  nicknameValueBox:{
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    height: 60,
  },
  nicknameValue:{
    fontSize: 30,
    borderWidth: 2,  
    borderColor: 'red',
    zIndex: 100,
    width: '100%',
    height: 60,
  },
  offText: {
    opacity:0    
  },
  onText:{
    opacity:1,
    fontSize: 30,
    borderWidth: 2,  
    borderColor: 'red',
    zIndex: 100,
    width: '100%',
    height: 60,
  },
  nicknameInput: {
    borderColor: '#722784',
    height: 60,
    paddingLeft: 10,
    borderWidth: 1.5,
    color: '#000',
    fontSize: 18
  },
  greenText: {
    color:'#00a930',
    paddingLeft: 5
  },
  redText: {
    color: '#ff0000',
    paddingLeft: 5
  }, 
  closeCircle: {
    position: 'absolute',
    top: 5,
    right: 50,
    fontSize: 15
  }, 
});
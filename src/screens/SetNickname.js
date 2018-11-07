import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import CompleteButton from '../components/CompleteButton'

class SetNickname extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      nickname: '',
      showValid: false,
      controlButton: true
    }
  }

  goToSelectIdol = () => {
    this.props.navigation.navigate('SelectIdol')
  }

  // CheckTextInputIsEmptyOrNot = () =>{
  //   const { nickname }  = this.state ;

  //   if (nickname === '') {
  //     this.setState({showValid: false})
  //     this.setState({controlButton: false})
  //   }
  // }

  checkNickname = (text) => {
    this.setState({nickname: text})
    // this.CheckTextInputIsEmptyOrNot()

    fetch('http://celebee-env-1.gimjpxetg2.ap-northeast-2.elasticbeanstalk.com/api/v1.0/user/nickname/', {
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
      if(res.status === 200) {
        this.setState({checkValid: true}) 
        this.setState({controlButton: false}) 
      } else {
        this.setState({checkValid: false})
        this.setState({controlButton: true})
      }
      console.log('res :', res)
    })

    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 2}}></View>
        <View style={styles.nickNameView}>
        {/* <KeyboardAvoidingView style={styles.nickNameView} behavior="padding" enabled> */}
          <Text style={styles.nickNameText}>닉네임 설정</Text>
          <TextInput 
            style={styles.nickname} 
            autoFocus={true}
            maxLength={12}
            placeholder="12자 이내의 닉네임을 설정해 주세요"
            onChangeText={(text) => this.checkNickname(text)}
            onFocus={this.emptyInput}
            // onSubmitEditing={Keyboard.dismiss} 
            returnKeyType="go"
            value={this.state.nickname}/>
        {/* </KeyboardAvoidingView> */}
          <View style={this.state.showValid ? styles.showValid : styles.hideValid}>
            <Text style={this.state.checkValid ? styles.greenText : styles.redText}>
              {this.state.checkValid ? '사용가능한 닉네임 입니다.' : '이미 사용중인 닉네임 입니다.'}
            </Text>
          </View>
        </View>
        <CompleteButton disabled={this.state.controlButton} navi={this.goToSelectIdol}/>
      </View>
    );
  }
}
export default SetNickname;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  nickNameView: {
    flex: 3,
    alignSelf: 'stretch',
  },
  nickNameText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 15
  },
  nickname: {
    height: 60,
    paddingLeft: 10,
    borderWidth: 1.5,
    borderColor: '#722784',
    color: '#000',
    fontSize: 18
  },
  showValid: {
    height: '100%'
  },
  hideValid: {
    height: 0
  },
  greenText: {
    color:'#00a930',
    paddingLeft: 5
  },
  redText: {
    color: '#ff0000',
    paddingLeft: 5
  }
});
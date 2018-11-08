import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { addUserInfo } from "../actions/users";

class SetNickname extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userInfo: this.props.userInfo,
      showValid: false,
      controlButton: false
    }
  }

  componentDidMount(){
  }

  componentDidUpdate(){
    
  }

  goToSelectIdol = () => {
    this.props.navigation.navigate('SelectIdol')
  }

  checkNickname = (text) => {

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
      this.setState(prevState => ({ 
        userInfo: {
          ...prevState.userInfo,
          nickName : text,
        }
      }))
      console.log('res :', res);
      this.setState({showValid: true})
      console.log('this.state.userInfo.nickName :', this.state.userInfo);
      if( !this.state.userInfo.nickName ){
        this.setState({showValid: false})
        this.setState({checkValid: true}) 
        this.setState({controlButton: false}) 
      } else if(res.status === 200) {
        this.setState({checkValid: true}) 
        this.setState({controlButton: false}) 
      } else {
        this.setState({checkValid: false})
        this.setState({controlButton: true})
      }

      
      console.log('this.state :', this.state);
    })
    this.changeButtonStyle()
  }

  changeButtonStyle() {
    let changedStyle = {
      backgroundColor : "#bbbbbb",
      paddingTop: 20,
      paddingBottom: 20,
      color:'#fff',
      textAlign: 'center',
      fontSize: 20,
      width: Dimensions.get('window').width,
    }
    
    if( this.state.showValid && this.state.userInfo.nickName){   // 텍스트 없을 때 / 중복 닉네임
      styles.selectBtn = changedStyle
      console.log('changedStyle :', changedStyle);
    } else if (!this.state.showValid) {   // 가능 닉네임
      changedStyle.backgroundColor = "#722784"
      console.log('changedStyle :', changedStyle);
      styles.selectBtn = changedStyle
    }
    console.log('style.selectBtn :', styles.selectBtn);
  }

  addUserInfo() {
    this.props.add(this.state.userInfo)
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
            value={this.state.userInfo.nickName}/>
        {/* </KeyboardAvoidingView> */}
          <View style={[this.state.showValid ? styles.showValid : styles.hideValid, !this.state.userInfo.nickName ? {display:"none"}: '']}>
            <Text style={this.state.checkValid ? styles.greenText : styles.redText}>
              {this.state.checkValid ? '사용가능한 닉네임 입니다.' : '이미 사용중인 닉네임 입니다.'}
            </Text>
          </View>
        </View>
        <TouchableOpacity             
            disabled={this.state.controlButton} 
            onPress={this.addUserInfo.bind(this)}>
            <Text 
                ref="button" style={[ 
                    styles.selectBtn,                     
                    // !this.state.showValid ? {backgroundColor: "#722784"} : {backgroundColor: "#bbbbbb"},
                    // !this.state.userInfo.nickName && !this.state.showValid ? {backgroundColor: "#bbbbbb"} : {backgroundColor: "#722784"}
                    ]}>완료
            </Text>
        </TouchableOpacity>       
      </View>
    );
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

export default  connect(mapStateToProps,mapDispatchToProps)(SetNickname);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fefefe",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
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
    borderColor: '#722784',
    height: 60,
    paddingLeft: 10,
    borderWidth: 1.5,
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
  },
  selectBtn: {
    paddingTop: 20,
    paddingBottom: 20,
    color:'#fff',
    textAlign: 'center',
    fontSize: 20,
    width: Dimensions.get('window').width,
    backgroundColor: '#bbbbbb'
  }
});
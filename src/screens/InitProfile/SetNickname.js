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

import { addUserInfo } from "../../actions/users";
import NicknameInput from "../../components/Input/NicknameInput"
import PhotoInput from "../../components/Input/PhotoInput"

import { MyApp, SelectIdolScreen } from '../Navigation'


class SetNickname extends Component { 
  constructor(props) {
    super(props);

    this.state = { 
      userInfo: this.props.userInfo,    
      valid: {
        alertText: false,
        completeButton: false
      },
    }
  }

  componentDidUpdate(prevProps) {
    if ( prevProps.userInfo.nickname !== this.props.userInfo.nickname || prevProps.userInfo.photo !== this.props.userInfo.photo) {
      this.setState(prevState => ({
        userInfo: {
          ...prevState.userInfo,
          nickname : this.props.userInfo.nickname,
          photo: this.props.userInfo.photo     
        },
      }))  
      console.log('changed this.state :', this.state);
    }
  }

  componentDidUpdate(){
    console.log(this.state.valid)
  }

  validFunc = (state) => {
    console.log('전달 받은 :', state);    
    console.log(' brfore this.state.userInfo :', this.state.userInfo);
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        email : state.userInfo.email,
        nickname : state.userInfo.nickname            
      },
      valid: state.valid
    }))    
  }

  addUserInfo() {
    this.props.add(this.state.userInfo)
    SelectIdolScreen()
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>      
        <Text style={styles.title}>셀레비에서 사용할{"\n"}프로필을 완성해주세요.</Text>
        <PhotoInput></PhotoInput>     
        <NicknameInput 
          title={"닉네임"}
          onValidFunc={this.validFunc}
        ></NicknameInput>
        <TouchableOpacity             
            disabled={!this.state.valid.completeButton} 
            onPress={this.addUserInfo.bind(this)}
          >
            <Text style={[ 
                styles.selectBtn,                                      
                this.state.valid.available? {backgroundColor: "#722784"} : {backgroundColor: "#bbbbbb"} 
              ]}>
              완료
            </Text>
        </TouchableOpacity>       
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  console.log('state :', state);
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
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    color: 'black',
    width: "100%",
    fontSize: 25,
    fontWeight: '600'
  },
  nickNameView: {
    alignSelf: 'stretch',
  },
  selectBtn: {
    color:'#fff',
    backgroundColor: '#bbbbbb',
    paddingTop: 20,
    paddingBottom: 20,
    width: Dimensions.get('window').width,
    alignSelf: 'flex-end',
    textAlign: 'center',
    fontSize: 20,
  }
});
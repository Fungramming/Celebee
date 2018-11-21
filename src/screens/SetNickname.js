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
import NicknameInput from "../components/nicknameInput"
import Navigation from 'react-native-navigation'
import { SelectIdolScreen } from './index'

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

  componentDidMount(){
    console.log(1,this.state.userInfo);
  }
  componentDidUpdate(){
    console.log(this.state.valid)
  }

  validFunc = (state) => {
    console.log('전달 받은 :', state);    
    
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        email : state.userInfo.email,
        nickname : state.userInfo.nickname            
      },
      valid: state.valid
    }))    

    
    console.log('11111:', this.state.userInfo);
  }

  addUserInfo() {
    this.props.add(this.state.userInfo)
    SelectIdolScreen()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 2}}></View>       
        <NicknameInput
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
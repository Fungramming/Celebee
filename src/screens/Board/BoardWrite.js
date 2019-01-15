import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage
} from "react-native";

import { connect } from "react-redux";

import { fetchUserInfoRequest } from "../../actions/users";
import NicknameInput from "../../components/Input/NicknameInput"
import PhotoInput from "../../components/Input/PhotoInput"

import { SelectIdolScreen } from '../Navigation'

class SetNickname extends Component { 
  static options(passProps) {
    console.log('@!passProps', passProps)
    return {
      // topBar: {
      //   title: {
      //     text: passProps.text,
      //   },
      //   visible: true,
      //   animate: false,
      //   rightButtons: [
      //     {
      //       id: 'toWriteScreen',
      //       icon: require('../../../assets/board.png'),
      //       testID: 'toWriteScreen',
      //       disableIconTint: true,
      //       showAsAction: 'always',
      //       // buttonFontSize: 10,
      //       // buttonFontWeight: '600',
      //       color: '#262626',
      //       weight: '100',
      //       enabled: true,
      //       disabledColor: 'grey'
      //     },
      //     {
      //       id: 'toAlarmScreen',
      //       icon: require('../../../assets/alarm.png'),
      //       testID: 'toAlarmScreen',
      //       disableIconTint: true,
      //       showAsAction: 'always',
      //       // buttonFontSize: 10,
      //       // buttonFontWeight: '600',
      //       color: '#262626',
      //       weight: '100',
      //       enabled: true,
      //       disabledColor: 'grey'
      //     },
      //   ]
      // }
      topBar: {
        visible: true, drawBehind: true, animate: true
      },
      bottomTabs: { 
        visible: false, drawBehind: true,
      }
    };
  }

  constructor(props) {
    super(props);

    this.state = { 
      token: this.props.token,
      userInfo: this.props.userInfo,    
      valid: {
        alertText: false,
        completeButton: false
      },
      imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 28
      }
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if ( prevState.userInfo.nickname !== this.state.userInfo.nickname) {
      this.setState(prevState => ({
        userInfo: {
          ...prevState.userInfo,
          email: this.props.userInfo.email,
          photo: this.props.userInfo.photo     
        },
      }))  
    }
  }

  validFunc = (state) => {
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        email: state.userInfo.email,
        nickname : state.userInfo.nickname            
      },
      valid: state.valid
    }))
  }

  addUserInfo = () => {
    this.props.fetchUserInfoRequest(this.state)
    SelectIdolScreen()
  }

  initPhoto = (data) => {
    this.setState(prevState => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        photo : data            
      },
    }))    
  }
  
  render() {
    return (
          <View style={[styles.outerContainer]}>
              <SafeAreaView style={styles.container}>
                  <ScrollView  
                      showsVerticalScrollIndicator={false} 
                      ref={ref => this.scrollView = ref}
                      onContentSizeChange={(contentWidth, contentHeight)=>{        
                        this.scrollView.scrollToEnd()}}>                
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <Text style={styles.title}>셀레비에서 사용할{"\n"}프로필을 완성해주세요.</Text>
                        <PhotoInput onInitPhoto={this.initPhoto}></PhotoInput>
                        <NicknameInput 
                          title={"닉네임 설정"}
                          onValidFunc={this.validFunc}
                          style={{paddingBottom:200}}
                        ></NicknameInput>            
                    </KeyboardAvoidingView>
                  </ScrollView>
              </SafeAreaView>
              <KeyboardAvoidingView behavior="padding" enabled>
                <TouchableOpacity             
                    disabled={!this.state.valid.completeButton} 
                    onPress={this.addUserInfo}
                    style={{alignSelf: 'flex-end' }}
                  >
                    <Text style={[ 
                        styles.selectBtn,                                      
                        this.state.valid.available? {backgroundColor: "#722784"} : {backgroundColor: "#bbbbbb"} 
                      ]}>
                      완료
                    </Text>
                </TouchableOpacity>    
              </KeyboardAvoidingView>
          </View>
    );
  }
}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
      token: state.user.token
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfoRequest: (userInfo) => {
          dispatch(fetchUserInfoRequest(userInfo))
      }
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(SetNickname);

const styles = StyleSheet.create({
  outerContainer: {
    // backgroundColor: "#fefefe",
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    color: 'black',
    width: "100%",
    paddingTop: 30,
    fontSize: 25,
    fontWeight: '600'
  },  
  selectBtn: {
    color:'#fff',
    backgroundColor: '#bbbbbb',
    paddingTop: 20,
    paddingBottom: 20,
    width: Dimensions.get('window').width,
    textAlign: 'center',
    fontSize: 20,
  }
});
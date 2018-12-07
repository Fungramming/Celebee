import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView, View, ScrollView, WebView } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import { fetchUserInfoRequest } from "../../actions/users";

import NicknameInput from "../../components/Input/NicknameInput"
import PhotoInput from "../../components/Input/PhotoInput"

class EditMyProfile extends Component {      
    static options(passProps) {
        return {
          topBar: {
            title: {
              text: '프로필 수정'
            },
            visible: true,
            animate: false,
            rightButtons: [
              {
                id: 'pressComplete',
                text: '완료'
              }          
            ]
          }
        };
    }
            
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);  

        this.state = { 
            token: props.token,
            userInfo: props.userInfo,
            valid: {
                alertText: false,
                completeButton: false
            }
        }
    }  
        
    navigationButtonPressed({ buttonId }) {
        // will be called when "buttonOne" is clicked
        if(buttonId == "pressComplete"){
            this.fetchUserInfo()
            Navigation.popToRoot(this.props.componentId);
        }
    }
         
    validFunc = (state) => {
        this.setState(prevState => ({
          userInfo: {
            ...prevState.userInfo,
            email : state.userInfo.email,
            nickname : state.userInfo.nickname            
          },
          valid: state.valid
        }))    
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
    
    fetchUserInfo = () => {
        this.props.fetchUserInfoRequest(this.state)
    }

  render() {
    return (
        // <View style={[styles.outerContainer]} >
        //     <View style={styles.container}>
        //         <ScrollView  
        //             showsVerticalScrollIndicator={false} 
        //             ref={ref => this.editscrollView = ref}
        //             onContentSizeChange={(contentWidth, contentHeight)=>{        
        //             this.editscrollView.scrollToEnd()}}>                
        //         {/* <KeyboardAvoidingView behavior="padding" enabled> */}
        //             <PhotoInput onInitPhoto={this.initPhoto}></PhotoInput>
        //             <NicknameInput 
        //                 title={"닉네임"}
        //                 onValidFunc={this.validFunc}
        //                 style={{paddingBottom:200}}
        //             ></NicknameInput>            
        //         {/* </KeyboardAvoidingView> */}
        //         </ScrollView>
        //     </View>
        // </View>
        <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        onLoad={e => console.log(e.nativeEvent.progress)}
      />
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(EditMyProfile)

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: "#fefefe",
        flex: 1,
    // height: Dimensions.get('screen').height
    },
    container: {
    flex:1,
    paddingHorizontal: 20,
    },
})

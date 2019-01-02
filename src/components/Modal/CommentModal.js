import React, { Component } from 'react'
import { 
  Text, 
  View, 
  StyleSheet, 
  Dimensions, 
  Image, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  ScrollView 
} from 'react-native'
import { connect } from "react-redux";

class CoComment extends Component {
  render() {
    return (
      <Text>CoComment</Text>
    )
  }
}

class Comment extends Component {
  render() {
    return (
      <Text>Comment</Text>
    )
  }
}

class CommentModal extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '댓글'
        },
      }
    };
  }

  onSubmit() {
    console.log("게시되었습니다.")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <TouchableOpacity>
            <Text>최신순</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15}}>
            <Text>좋아요순</Text>
          </TouchableOpacity>
        </View>    
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
              <Image
                source={require("../../../assets/user.png")}
                style={styles.feedHeaderPhoto}
                />
              <View style={styles.feedHeaderTextWrap}>
                <View style={styles.headerText}>
                  <Text style={styles.userName}>비투비임현시규</Text>
                  <Text>2시간 전</Text>
                </View>
                <Text style={styles.feedHeaderSubText}>몸도 한참 노곤노곤한게 뜨끈한 물에 한숨 지지고 나와 식헤 뚜악</Text>
              </View>           
            </View>
            <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
              <Image
                source={require("../../../assets/user.png")}
                style={styles.feedHeaderPhoto}
                />
              <View style={styles.feedHeaderTextWrap}>
                <View style={styles.headerText}>
                  <Text style={styles.userName}>비투비임현시규</Text>
                  <Text>2시간 전</Text>
                </View>
                <Text style={styles.feedHeaderSubText}>몸도 한참 노곤노곤한게 뜨끈한 물에 한숨 지지고 나와 식헤 뚜악</Text>
              </View>           
            </View>
            <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
              <Image
                source={require("../../../assets/user.png")}
                style={styles.feedHeaderPhoto}
                />
              <View style={styles.feedHeaderTextWrap}>
                <View style={styles.headerText}>
                  <Text style={styles.userName}>비투비임현시규</Text>
                  <Text>2시간 전</Text>
                </View>
                <Text style={styles.feedHeaderSubText}>몸도 한참 노곤노곤한게 뜨끈한 물에 한숨 지지고 나와 식헤 뚜악</Text>
              </View>           
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={[styles.textInput, {backgroundColor: "#fefefe"}]}>
          <TextInput 
              ref={(input) => { this.textInput = input; }}
              // style={styles.textInput} 
              maxLength={12}
              placeholder="12자 이내의 닉네임을 설정해 주세요"
              onChangeText={(text) => this.checkNickname(text)}
              returnKeyType="done"            
            />
          <TouchableOpacity onPress={this.onSubmit}>
            <Text>게시</Text>
          </TouchableOpacity>  
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
      token: state.user.token
  }
}

export default connect(mapStateToProps)(CommentModal);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fefefe",
    flex: 1,
    borderRadius: 15
  },  
  filter:{
    borderBottomColor: "#cecece",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  feedHeader: {
    width: Dimensions.get('window').width,
    paddingTop: 10,
    paddingBottom: 17,
    paddingHorizontal: 12,
    flexDirection:'row',
  },
  feedHeaderPhoto: {
    backgroundColor: '#dedede',
    borderRadius: 20,
    marginVertical: 12,
    width: 55,
    height: 55,
    flexDirection: 'row',
  },
  feedHeaderTextWrap: {
    width: 300,
    flexDirection: 'column',
  },
  headerText: {
    flexDirection: 'row',
    paddingTop: 10
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 13,
  },
  feedHeaderSubText: {
    fontSize: 14,
    marginHorizontal: 13,
    marginVertical: 8,
    color: '#505050',
  },
  textInput: {
    borderColor: "#cecece",
    borderWidth: 1,
    flexDirection:'row',
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 5,
    paddingHorizontal: 10
  }
})
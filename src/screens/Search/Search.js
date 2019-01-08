import React, { Component } from 'react'
import { 
  AsyncStorage, 
  FlatList,
  Text, 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Image
} from 'react-native'
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign';

class Search extends Component {

  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '검색',
        },
        visible: true,
        animate: false,
      }
    };
  }

  constructor(props){
    super(props)
    this.state = {
      uid: '',
      token: '',
      searchedWords: [],
      searchedWordsVisible: false
    }
    this.dismissKeyboard = this.dismissKeyboard.bind(this)
    this.deleteSearchedWord = this.deleteSearchedWord.bind(this)
  }

  componentDidMount() {
    this.getSearchWords()
  }

  getSearchWords = async () => {
    try {
      let user = await AsyncStorage.getItem('user') 
      user = JSON.parse(user)
      if(user.searchedWords == undefined){
        user.searchedWords = []
      }
      this.setState({
        uid: user.uid,
        token: user.accessToken,
        searchedWords: user.searchedWords
      }) 
    } catch (e) {

    }     
  }
  
  saveSearchWord = (text) => {
    let searchedWords;

    if( typeof this.state.searchedWords == 'undefined'){
      searchedWords = []
      searchedWords.unshift(text)
    } else {
      searchedWords = this.state.searchedWords
      // 최근 검색어 5개 제한
      if(searchedWords.length >= 5){
        searchedWords.pop()
      }
      // 검색어 중복 제한
      if(searchedWords.indexOf(text) == -1) {
        searchedWords.unshift(text)
      }
    }
    let data = { 
      uid: this.state.uid, 
      accessToken: this.state.token,
      searchedWords: searchedWords
    }
    
    this.setState(prevState => ({
      ...prevState,
      searchedWords: searchedWords
    }))

    AsyncStorage.setItem('user', JSON.stringify(data))      
  }

  deleteSearchedWord = (text) => {
    let searchedWords = this.state.searchedWords;
    searchedWords.splice(searchedWords.indexOf(text), 1);
    let data = { 
      uid: this.state.uid, 
      accessToken: this.state.token,
      searchedWords: searchedWords
    }

    this.setState(prevState => ({
      ...prevState,
      searchedWords: searchedWords
    }))

    AsyncStorage.setItem('user', JSON.stringify(data))      
  }

  updateText(text) {
    this.dismissKeyboard()
    this.saveSearchWord(text)
  }

  dismissKeyboard() {
    this.setState(prevState => ({
      ...prevState,
      searchedWordsVisible: false
    }))
    Keyboard.dismiss()
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        <View style={styles.container}>            
          <View style={styles.searchBar}>
            <Image style={{width: 25, height: 25}} source={require('../../../assets/search.png')} />            
            <TextInput 
                ref={(input) => { this.textInput = input; }}
                style={styles.textInput}
                onFocus= {()=>{this.setState({
                  searchedWordsVisible: true
                })}}
                placeholder="스케줄 검색하기"
                onSubmitEditing={(event) => this.updateText( event.nativeEvent.text)}
                returnKeyType="done"            
                />
          </View>
          <View>

          </View>
          {this.state.searchedWordsVisible && this.state.searchedWords.length > 0 ?  
          <View>
            <Text style={styles.tilte}>최근 검색어</Text>        
            <FlatList
              style={{flexDirection: 'column'}}
              showsHorizontalScrollIndicator={false}
              data={this.state.searchedWords}
              renderItem={({item}) => {
                  return (
                    <View style={styles.searchedWords}>
                      <TouchableOpacity onPress={console.log('11 :', 11)}>
                        <Text style={styles.searchedWord}>{item}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {this.deleteSearchedWord(item)}}>
                        <Text style={styles.removeBtn}>제거</Text>
                      </TouchableOpacity>                      
                    </View>
                  )
              }}
              keyExtractor={(item, index) => index.toString()} 
            />
          </View> 
          : <Text></Text>}
          
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
      token: state.user.token
  }
}

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    flex: 1,
    paddingHorizontal: 20
  },
  searchBar: {
    borderColor: '#540077',
    borderBottomWidth: 1,
    height: 60,
    color: '#000',
    fontSize: 18,
    flexDirection:'row',
    alignItems: 'center'
  },
  tilte: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20
  },
  textInput: {
    paddingLeft: 10, 
    width: '100%',
    fontSize: 20
  },
  searchedWords: {
    borderColor: "#cecece",
    borderBottomWidth:1,
    flexDirection: 'row', 
    width: '100%'
  },
  searchedWord: {
    fontSize: 16,
    paddingVertical: 10,
    width: Dimensions.get('window').width - 70
  },
  removeBtn: {
    paddingVertical: 10,
  }
})

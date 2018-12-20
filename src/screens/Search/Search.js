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
  Keyboard 
} from 'react-native'
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign';

class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      uid: '',
      token: '',
      searchedWords: [],
      searchedWordsVisible: false
    }
    this.dismissKeyboard = this.dismissKeyboard.bind(this)
  }

  componentDidMount() {
    this.getSearchWords()
  }

  getSearchWords = async () => {
    try {
      let user = await AsyncStorage.getItem('user') 
      user = JSON.parse(user)
      this.setState({
        uid: user.uid,
        token: user.accessToken,
        searchedWords: user.searchedWords
      }) 
      console.log('after this.state :', this.state);
    } catch (e) {

    }     
  }
  
  saveSearchWord = (text) => {
    let searchedWords;

    if( typeof this.state.searchedWords == 'undefined'){
      searchedWords = []
      searchedWords.push(text)
    } else {
      searchedWords = this.state.searchedWords
      if(searchedWords.length >= 5){
        searchedWords.shift()
      }
      searchedWords.push(text)
    }
    console.log('searchedWords :',typeof searchedWords);
    let data = { 
      uid: this.state.uid, 
      accessToken: this.state.token,
      searchedWords: searchedWords
    }
    
    this.setState(prevState => ({
      ...prevState,
      searchedWords: searchedWords
    }))
    console.log('data :', data);

    AsyncStorage.setItem('user', JSON.stringify(data))      
  }

  deleteSearchedWord = async (data) => {
    await AsyncStorage.setItem('user', JSON.stringify(data))      
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
            <Icon name="search1" size={24}></Icon>
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
          {this.state.searchedWordsVisible ? 
          <View>
            <Text style={styles.tilte}>최근 검색어</Text>        
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.state.searchedWords}
              renderItem={({item}) => {
                  return (
                    <TouchableOpacity onPress={console.log('11 :', 11)}>
                      <Text style={styles.searchedWords}>{item}</Text>
                    </TouchableOpacity>
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
    width: Dimensions.get('window').width
  }
})

import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Button, FlatList } from 'react-native'
import SelectIdolList from '../components/SelectIdolList'

class SelectIdol extends Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        // idols : ds.cloneWithRows(['BTS','뉴이스트','트와이스','세븐틴','엑소','워너원','비투비', 'BTS','뉴이스트','트와이스','세븐틴','엑소','워너원','비투비', 'BTS','뉴이스트','트와이스','세븐틴','엑소','워너원','비투비']),
        idolList: [],
    }
  }

  componentDidMount() {
    this.getIdolList()
  }
  
  getIdolList =() => {
    fetch('http://celebee-env-1.gimjpxetg2.ap-northeast-2.elasticbeanstalk.com/api/v1.0/idols/')
    .then( (res) => res.json() )
    .then( (json) => {
      this.setState({ idolList: json.idols })
    })
    .catch( (err) => {
      console.log('err :', err);
    })
  }

  goToMain = () => {
    this.props.navigation.navigate('AppTabNavigator')
  }

  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar 
          barStyle="dark-content"
        />

        <View style={styles.headerTextWrap}>
          <Text style={styles.headerText}>좋아하는 아이돌을 팔로우해보세요!</Text>
          <Text style={styles.headerText}>스케줄과 클립, 뉴스까지 받아보실 수 있습니다.</Text>
        </View>
        <Text style={styles.selectHeaderText}>내 최애 아이돌 선택하기</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Text style={styles.selectFilterText}>인기순</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.selectFilterText}>가나다순</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.idolList}
          renderItem={({item}) => {
            return <SelectIdolList name={item.idol_name} followNum={item.total_followers}></SelectIdolList>
          }}
          keyExtractor={(item, index) => index.toString()} >
        </FlatList>

        <View style={styles.selectBtn}>
          <Button title="선택완료" onPress={() => this.goToMain()}/>
        </View>

      </View>
    );
  }
}
export default SelectIdol;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
  },
  headerTextWrap: {
    marginTop: 60,
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5
  },
  // selectHeaderTextWrap: {
  //   marginTop: 35,
  // },
  selectHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  selectFilterText: {
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 12,
  },
  selectBtn: {
    marginTop: 15,
    marginBottom: 30,
  },
});
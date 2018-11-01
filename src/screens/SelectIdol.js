import React, { Component } from 'react'
import { Text, StyleSheet, View, ListView, ScrollView, TouchableOpacity, StatusBar, Button } from 'react-native'
import SelectIdolList from '../components/SelectIdolList'

class SelectIdol extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        idols : ds.cloneWithRows(['BTS','뉴이스트','트와이스','세븐틴','엑소','워너원','비투비', 'BTS','뉴이스트','트와이스','세븐틴','엑소','워너원','비투비', 'BTS','뉴이스트','트와이스','세븐틴','엑소','워너원','비투비'])            
    }
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
          <Text style={styles.headerText}>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다.</Text>
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

        <ListView 
          // horizontal={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'flex-start',
            // paddingStart: 24,
            // paddingEnd: 24
          }}
          dataSource={this.state.idols}
          renderRow={ (rowData) => <SelectIdolList name={rowData}></SelectIdolList> }
        >
        </ListView>

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
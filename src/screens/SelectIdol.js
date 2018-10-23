import React, { Component } from 'react'
import { Text, StyleSheet, View, ListView, ScrollView, TouchableOpacity, StatusBar, Button } from 'react-native'
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body,} from 'native-base';
import SelectIdolList from '../components/SelectIdolList'

// class IdolCard extends Component {
//   render() {
//       return (
//         <TouchableOpacity style={styles.idolCard}>
//           <Text style={styles.idolPhoto}></Text>
//           <Text style={styles.idolName}>{this.props.name}</Text>
//         </TouchableOpacity>
//       )
//   }
// }

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
      <Container style={styles.container}>
        <StatusBar 
          barStyle="dark-content"
        />
        <Content>

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerText}>좋아하는 아이돌을 팔로우해보세요!</Text>
            <Text style={styles.headerText}>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다.</Text>
          </View>

          <View style={styles.selectHeaderTextWrap}>
            <Text>
              <Text style={styles.selectHeaderText}>내 최애 아이돌 선택하기</Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.selectFilterText}>인기순</Text>
              <Text style={styles.selectFilterText}>가나다순</Text>
            </View>
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
            renderRow={(rowData)=><SelectIdolList name={rowData}></SelectIdolList>}
          >
          </ListView>
        </Content>
        <View style={styles.selectBtn}>
          <Button title="선택완료" onPress={() => this.goToMain()}/>
        </View>
      </Container>
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
    flex: 0.2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 60,
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5
  },
  selectHeaderTextWrap: {
    marginTop: 35,
  },
  selectHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
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
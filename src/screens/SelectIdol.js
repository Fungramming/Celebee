import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body, Button } from 'native-base';

class SelectIdol extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerText}>좋아하는 아이돌을 팔로우해보세요!</Text>
          <Text style={styles.headerText}>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다.</Text>
        </View>

        <Content>
          <View style={{flex: 1}}>
            <ScrollView 
              // horizontal={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'flex-start',
                // paddingStart: 24,
                // paddingEnd: 24
              }}
            >
              <View style={styles.SelectHeaderTextWrap}>
                <Left style={{backgroundColor: 'yellow'}}>
                  <Text style={styles.SelectHeaderText}>내 최애 아이돌 선택하기</Text>
                </Left>
                <Right>
                  <Text>선택완료</Text>
                </Right>
                <Text>인기순</Text>
                <Text>가나다순</Text>
              </View>

              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>좋아하는 아이돌을 팔로우해보세요! 좋아하는 아이돌을 팔로우해보세요!</Text>
              <Text>스케쥴과 클립, 뉴스까지 받아보실 수 있습니다. 좋아하는 아이돌을 팔로우해보세요!</Text>
            </ScrollView>
          </View>
        </Content>
        <Button full rounded style={styles.SelectBtn}>
          <Text style={{color:'#fff', fontSize: 18}}>선택완료</Text>
        </Button>
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
    marginTop: 30,
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15
  },
  SelectHeaderTextWrap: {
    flex: 1,
  },
  SelectHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  SelectBtn: {
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: '#722784',
    borderRadius: 15,
  },
});
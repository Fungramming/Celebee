import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, FlatList } from 'react-native'

class FeedItems extends Component {
  render() {
    return (
      <View style={styles.feedItems}>
        <Image source={this.props.photo} style={styles.feedItemsImg} />
        <Text style={styles.feedItemsText}> {this.props.title} </Text>
      </View>
    )
  }
}
export default class FeedCard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      news: [
        {
          photo: require('../../../assets/user.png'),
          title: 'Really Bad Boy 컴백 티저 최초 공개!'
        },
        {
          photo: require('../../../assets/user.png'),
          title: 'Really Bad Boy 컴백 티저 최초 공개!'
        },
        {
          photo: require('../../../assets/user.png'),
          title: 'Really Bad Boy 컴백 티저 최초 공개!'
        },
    ],
      video: [
        {
          photo: require('../../../assets/user.png'),
          title: 'Really Bad Boy 컴백 티저 최초 공개!'
        },
        {
          photo: require('../../../assets/user.png'),
          title: 'Really Bad Boy 컴백 티저 최초 공개!'
        },
        {
          photo: require('../../../assets/user.png'),
          title: 'Really Bad Boy 컴백 티저 최초 공개!'
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}> 스케줄, 기사 제목 영역 </Text>
          <Text style={styles.headerSubText}> PM 06:00 | 스케줄 장소 및 방송 채널 입력 </Text>
        </View>
        <View style={{marginHorizontal: -12}}>
          <Text style={styles.feedItemsTitle}>뉴 스</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.news}
            renderItem={({item}) => {
                return <FeedItems photo={item.photo} title={item.title}></FeedItems> 
            }}
            keyExtractor={(item, index) => index.toString()} 
          />
        </View>
        <View style={{marginHorizontal: -12}}>
          <Text style={styles.feedItemsTitle}>영 상</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.video}
            renderItem={({item}) => {
                return <FeedItems photo={item.photo} title={item.title}></FeedItems> 
            }}
            keyExtractor={(item, index) => index.toString()} 
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  header: {
    paddingTop: 18,
    paddingBottom: 15,
    marginHorizontal: -17,
    marginBottom: 8,
    // flexWrap: 'wrap', 
    // alignItems: 'flex-start',
    // flexDirection:'row',
    borderBottomColor: 'rgb(200, 200, 200)', 
    borderBottomWidth: 0.25
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 24,
    marginBottom: 5,
    marginHorizontal: 13,
  },
  headerSubText: {
    fontSize: 14,
    height: 24,
    marginHorizontal: 13,
    color: '#505050',
  },
  feedItems: {
    width: 220,
    marginRight: 10.5,
    marginBottom: 20,
    paddingLeft: 10.5,
  },
  feedItemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#505050',
    marginBottom: 10,
    marginHorizontal: 12
  },
  feedItemsImg: {
    width: 220,
    height: 123,
    borderRadius: 5,
  },
  feedItemsText: {
    margin: 5,
  },
});
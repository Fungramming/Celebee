import React, { Component } from 'react'
import { Share, Text, View, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import ScheduleHeader from '../../../src/screens/Feed/components/ScheduleHeader'

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
      toggleDetail: false
    };

    this.onPressLink = this.onPressLink.bind(this)
  }

  _onToggleDetail() {
    const toggle = !this.state.toggleDetail;
    this.setState(prevState => ({
      ...prevState,
      toggleDetail: toggle
    }))
  }

  onPressLink() {
    this.props.onLink()
  }
  
  shareContents() {
    Share.share({
      message: 'BAM: we\'re helping your business with awesome React Native apps',
      url: 'http://bam.tech',
      title: 'Wow, did you see that?'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScheduleHeader detail={() => this._onToggleDetail()}/>
        {this.state.toggleDetail 
          ? 
          <Text style={styles.feedDetail} onPress={() => this._onToggleDetail()}>
            <Text>피드 상세 내용</Text>
            <Text style={styles.feedDetailText}>
              생방송 SBS 인기가요 - 사전 녹화 * 일 시 : 2018. 12. 09. (일) 09:00 AM * 장 소 : SBS 등촌동 공개홀 상단의 시간은 입장 번호 배정 시작 시간이니 착오 없으시기 바라며, 입장 시간은 일정하지 않고 방송국 상황에 따라 달라질 수 있으니, 가급적 일찍 도착해 주시기 바랍니다. 많은 참여 부탁 드립니다. [ 참여 방법 ] http://redvelvet.smtown.com/ 참여방법은 해당 링크를 참조해주세요!
            </Text>
          </Text>
          : null
        }
        <View style={{marginHorizontal: -12}}>
          <Text style={styles.feedItemsTitle}>뉴 스</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.news}
            renderItem={({item}) => {
                return (
                  // <TouchableOpacity onPress={this.onPressLink(this.state.news.uri)}> 이런시으로 들어가려나
                  <TouchableOpacity onPress={ this.onPressLink}>
                    <FeedItems photo={item.photo} title={item.title}></FeedItems> 
                  </TouchableOpacity>
                )
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
        <View style={styles.feedBottom}>
            <View style={styles.feedBottomLeft}>
              <Icon name='heart' size={25} style={{paddingRight: 22}}/>
              <Icon name='message-circle' size={25}/>
            </View>
            <TouchableWithoutFeedback onPress={() => this.shareContents()}>
              <Icon name='share-2' size={25}/>
            </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingLeft: 12,
    paddingBottom: 25,
    paddingHorizontal: 12,
    flexDirection:'column',
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1.25,
  },
  feedDetail: {
    height: 500,
    width: Dimensions.get('window').width,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    top: 72,
    zIndex: 99
  },
  feedDetailText: {
    color: '#505050',
    fontSize: 16,
  },
  feedItemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#505050',
    marginBottom: 10,
    marginHorizontal: 12
  },
  feedItems: {
    width: 220,
    marginHorizontal: 10.5,
    marginBottom: 20,
  },
  feedItemsImg: {
    width: 220,
    height: 123,
    borderRadius: 5,
  },
  feedItemsText: {
    margin: 5,
  },
  feedBottom: {
    height: 30,
    flexDirection: 'row',
  },
  feedBottomLeft: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
});
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
    };

    this.onPressLink = this.onPressLink.bind(this)
  }
  
  componentDidMount() {
    console.log('this.props :', this.props);
    this.setState(prevState=>({
      ...prevState,
      date: this.props.date
    }))
  }
  
  onPressLink() {
    console.log('this.props :', this.props);
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
        <ScheduleHeader detail={this.props.detail}/>
        <Text>{this.state.date}</Text>
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
              <TouchableOpacity style={{paddingRight: 22}}>
                <Image style={styles.iconSize} source={require('../../../assets/like.png')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.iconSize} source={require('../../../assets/comment.png')} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.feedBottomRight} onPress={() => this.shareContents()}>
              <Image style={styles.iconSize} source={require('../../../assets/share.png')} />
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    paddingHorizontal: 12,
    flexDirection:'column',
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1.25,
    backgroundColor: '#fff'
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
  iconSize: {
    width: 25,
    height: 25
  }
});
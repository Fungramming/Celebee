import React, { Component } from 'react'
import { SafeAreaView, Text, View, WebView, StyleSheet, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";

import CommentModal from "../../components/Modal/CommentModal"

export default class LinkView extends Component {
  constructor(props){
    super(props)
    this.state = {
      isModalVisible: false
    }
    this.onPressLike = this.onPressLike.bind(this);
    this.onPressShare = this.onPressShare.bind(this);
    this.onPressSave = this.onPressSave.bind(this);
    this.onPressComment = this.onPressComment.bind(this);
    this.onBackButton = this.onBackButton.bind(this);

  }
  onBackButton() {
    Navigation.pop(this.props.componentId);
  }

  onPressLike() {
    console.log('onPressLike')
  }

  onPressSave() {
    console.log('onPressSave')
  }

  onPressComment() {
    console.log('onPressComment')
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  onPressShare() {
    console.log('onPressShare')
  }

  render() {
    console.log('url this.props :', this.props);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>                
          <TouchableOpacity onPress={this.onBackButton}>
            <Icon name='arrow-down-left' style={{paddingRight: 12}} size={22}/>
          </TouchableOpacity>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={this.onPressLike}>
              <Icon name='anchor' style={{paddingRight: 12}} size={22}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressSave}>
              <Icon name='home' style={{paddingRight: 12}} size={22}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressComment}>
              <Icon name='map' style={{paddingRight: 12}} size={22}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressShare}>
              <Icon name='save' style={{paddingRight: 12}} size={22}/>
            </TouchableOpacity>
          </View>
        </View>
        <Modal 
          isVisible={this.state.isModalVisible}
          onSwipe={() => this.setState({ isVisible: false })}
          swipeDirection="down"
          >
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
            <TouchableOpacity onPress= {this.onPressComment}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
            <CommentModal/>
          </View>
        </Modal>
        <WebView
          source={{uri: this.props.url}}      
          style={{flex:1}}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: '100%',
    flex: 1
  },
  header: {
    paddingTop: 10,
    paddingBottom: 17,
    paddingLeft: 12,
    flexDirection:'row',
    position: 'relative',
    zIndex: 999
  },
  headerButtons: {
    flexDirection: 'row',
    marginLeft: 'auto'
  },
});
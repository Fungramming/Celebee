import React, { Component } from 'react'
import { SafeAreaView, Text, View, WebView, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
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
    this.onSwipe = this.onSwipe.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  onSwipe() {
    console.log('11111111111111111 :', 11111111111111111);
    this.setState({ isModalVisible: false })
  }

  
  toggleModal() {
    this.setState(prevState => ({ 
      ...prevState,
      isModalVisible: false
    }));
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
          style={{position: 'relative', justifyContent: "flex-end", margin: 0, }} backdropOpacity={0.2} deviceHeight={Dimensions.get('window').height}
          isVisible={this.state.isModalVisible}
          onSwipe={ this.onSwipe }
          swipeDirection="down"
          >
            <TouchableOpacity style={styles.alarmToggleBtn} onPress={this.toggleModal} >
            </TouchableOpacity>         
            <CommentModal/>
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
  alarmToggleBtn: {
    paddingRight: 12,
    paddingBottom: 5, 
    height: 50, 
    paddingLeft: Dimensions.get('window').width,
    alignSelf: 'flex-end' 
  },
});
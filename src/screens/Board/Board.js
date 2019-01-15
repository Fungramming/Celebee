import React, { Component } from "react";
import { 
  Dimensions,
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  ListView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";
import { Navigation } from 'react-native-navigation'
import { connect } from "react-redux";

import BoardCard from "../../components/Card/boardCard";
import { ALARM_SCREEN, SEARCH_SCREEN, BOARD_LIST_SCREEN   } from '../Navigation'

class Board extends Component {
  static options() {
    return {
      topBar: {
        title: {
          text: '게시판',
        },
        visible: true,
        animate: false,
        rightButtons: [
          {
            id: 'toSearchScreen',
            icon: require('../../../assets/search.png'),
            testID: 'toSearchScreen',
            disableIconTint: true,
            showAsAction: 'always',
            // buttonFontSize: 10,
            // buttonFontWeight: '600',
            color: '#262626',
            weight: '100',
            enabled: true,
            disabledColor: 'grey'
          },
          {
            id: 'toAlarmScreen',
            icon: require('../../../assets/alarm.png'),
            testID: 'toAlarmScreen',
            disableIconTint: true,
            showAsAction: 'always',
            // buttonFontSize: 10,
            // buttonFontWeight: '600',
            color: '#262626',
            weight: '100',
            enabled: true,
            disabledColor: 'grey'
          },
        ]
      }
    };
  }

  constructor(props){
    super(props)
    Navigation.events().bindComponent(this);
    this.state = {
      testData: [1,2,3,4,5],
      refreshing: false,
      idol_list: this.props.idol_list,
      idol_names: ['전체게시판'],
    }

    this.onBoardListPress = this.onBoardListPress.bind(this)
    this.onBookmarkPress = this.onBookmarkPress.bind(this)
  }

  componentDidMount() {
    const idol = this.state.idol_list
    const idolNames = this.state.idol_names
    for (let i = 0; i < idol.length; i++ ) {
      idolNames.push(idol[i].idol_name)
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('@state.idol_list :', this.state.idol_list)
  //   console.log('@this.props.idol_list', this.props.idol_list)
  //   if ( this.state.idol_list.length !== this.props.idol_list.length) {
  //       this.setState(prevState => ({
  //           ...prevState,
  //           idol_list: this.props.idol_list,
  //       }))  
  //   }
  // }

  navigationButtonPressed({ buttonId }) {
    // will be called when "buttonOne" is clicked
    if(buttonId == "toAlarmScreen"){
      this.onAlarmPress()
    } 
    if (buttonId == "toSearchScreen") {
      console.log('@!$!%@#$!##$!clickclick')
      this.onSearchPress()
    }
  }

  onAlarmPress() {
    Navigation.push(this.props.componentId, {
      component: {
        name: ALARM_SCREEN
      }
    })
  }

  onSearchPress() {
    Navigation.push(this.props.componentId, {
      component: {
        name: SEARCH_SCREEN,       
      }
    })
  }

  onBoardListPress(boardName) {
    Navigation.push(this.props.componentId, {
      component: {
        name: BOARD_LIST_SCREEN,
        passProps: {
          text: `${boardName} 게시판`
        },   
      }
    })
    console.log('$!$boardName :', boardName);
  }

  onBookmarkPress() {
    console.log('$$this', this)
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar barStyle="dark-content"/>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.idolBoardWrap}>

              <TouchableWithoutFeedback onPress={() => this.onBoardListPress('전체')}>
                <View style={styles.idolBoard}>
                  <Image source={require('../../../assets/logo_white.png')} style={{alignSelf: 'center', width: 70, height: 70}}/>
                  <View style={styles.idolBoardTxt}>
                    <Text style={styles.idolBoardTxtSize}>전체 게시판</Text>
                    <TouchableOpacity style={styles.idolIcon}>
                      <Image source={require("../../../assets/alarm.png")}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              
              {this.state.idol_list.map((item, index) => (
                <TouchableWithoutFeedback onPress={() => this.onBoardListPress(item.idol_name)}>
                  <View style={styles.idolBoard}>
                    <View style={styles.idolBoardTxt}>
                      <Text style={styles.idolBoardTxtSize}>{item.idol_name}</Text>
                      <TouchableOpacity key={item.id} style={styles.idolIcon} onPress={this.onBookmarkPress}>

                        <Image source={require("../../../assets/alarm.png")}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))}

            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('@@state', state)
  return {
    token: state.user.token,
    follow_idol_id: state.user.userInfo.follow_idol_id,
    idol_list: state.user.userInfo.idol_list
  }
}

export default connect(mapStateToProps)(Board);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
  },
  idolBoardWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 12
  },
  idolBoard: {
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width / 2.22,
    height: 130,
    borderRadius: 5,
    backgroundColor: '#722784',
    marginHorizontal: 6,
    marginTop: 12,
  },
  idolBoardTxt: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  idolBoardTxtSize: {
    fontSize: 16,
    fontWeight: '500'
  },
  idolIcon: {
    position: 'absolute', 
    top: 5, 
    right: 10, 
    alignSelf: 'flex-end'
  }
});
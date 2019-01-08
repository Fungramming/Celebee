import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
class IdolIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      follow_idol_id: this.props.userInfo.follow_idol_id,
    }
  }

  componentDidMount(){
    console.log('!@this.state', this.state)
  }

  render() {
    const {idolButton} = this.props
    console.log('inthis.props', this.props)
    return (
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=> idolButton('all')}>
          <Text>모두</Text>
        </TouchableOpacity>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.props.userInfo.follow_idol_id}
          renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity onPress={()=> idolButton(item.id)}>
                    <Text style={styles.idolName}>{item.idol_name}</Text>
                  </TouchableOpacity>
                </View>
              )
          }}
          keyExtractor={(item, index) => index.toString()}
          style={
            {                  
              paddingLeft: 29, 
              borderBottomColor: 'rgb(200, 200, 200)',
              borderBottomWidth: 2
            }
          }
        />
      </View>
    )
  }
}


const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
  }
}

export default connect(mapStateToProps)(IdolIndicator)


const styles = StyleSheet.create({
  idolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#878787',
    textAlign: 'center',
    marginRight: 26,
    height: 30
  }
});
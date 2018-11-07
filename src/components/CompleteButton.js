import React, { Component } from 'react'
import {Platform, Text, View, StyleSheet, Dimensions,TouchableOpacity, Button } from 'react-native'
import { connect } from "react-redux";
import { addUserInfo } from "../actions/users";


class CompleteButton extends Component {
    constructor(props){
        super(props)
        this.state = { 
            userInfo: this.props.userInfo,           
        }
    }

    addUserInfo() {
        this.props.add(this.state.userInfo)
        this.props.navi
    }
    render() {
        return (
            <TouchableOpacity disabled={this.props.disabled} onPress={this.addUserInfo.bind(this)}>
                <Text style={styles.selectBtn}>완료
                    {/* <Button title="완료" /> */}
                </Text>
            </TouchableOpacity>
        )
    }
}
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
    }
  }
const mapDispatchToProps = dispatch => {
    return {
        add: (userInfo) => {
            dispatch(addUserInfo(userInfo))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CompleteButton)

const styles = StyleSheet.create({
    selectBtn: {
        // position: "absolute",
        // bottom: 0,
        // marginVertical: 24,
        // marginHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
        color:'#fff',
        textAlign: 'center',
        fontSize: 20,
        width: Dimensions.get('window').width,
        backgroundColor: '#722784'
    },
})
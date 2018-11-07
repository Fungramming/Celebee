import React, { Component } from 'react'
import {Platform, Text, View, StyleSheet, Dimensions,TouchableOpacity, Button } from 'react-native'

export default class CompleteButton extends Component {
    render() {
        return (
            <TouchableOpacity disabled={this.props.disabled} onPress={this.props.navi}>
                <Text style={styles.selectBtn}>완료
                    {/* <Button title="완료" /> */}
                </Text>
            </TouchableOpacity>
        )
    }
}

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
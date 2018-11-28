import React, { Component } from 'react'
import {Platform, Text, View, ListView, StyleSheet, Dimensions,TouchableOpacity, Image, FlatList, AsyncStorage } from 'react-native'
import { config } from '../../../actions/types'
import { connect } from "react-redux";

class IdolCard extends Component {
    render() {
        return (
            <View style={styles.idolCard}>
                <Image style={styles.idolPhoto} />
                <Text style={styles.idolName}>{this.props.name}</Text>
            </View>
        )
    }
}

class MyIdol extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                followIdol: this.props.userInfo.followIdol
            }
        }
    }
    
    render() {
        return (
            <View style={styles.myIdol}>
                <Text style={styles.subTitle}>내 아이돌</Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.userInfo.followIdol}
                    renderItem={({item}) => {
                        return <IdolCard name={item.idol_name}></IdolCard>
                    }}
                    keyExtractor={(item, index) => index.toString()} 
                >
                </FlatList>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,   // Mount 될때 initialState 를 가져옴 , this.props 로. users 는 actios 에서의 users.js 의 이름
    }
}

export default connect(mapStateToProps)(MyIdol)

const styles = StyleSheet.create({
    myIdol: {
        height: 180,
        width: Dimensions.get('window').width,
        // paddingLeft: 15
    },
    subTitle : {
        marginLeft: 12,
        marginBottom: 20,
        width: 100,
        fontWeight: '600',
        fontSize: 20,
        // paddingLeft: 15
    },
    idolCard: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 0.5,
        ...Platform.select({
            ios: {
                marginHorizontal: 0.5
            },
            android: {
                marginHorizontal: 4
            },
        }),
    },
    idolPhoto: {
        backgroundColor: '#dedede',
        borderRadius: 25,
        marginBottom:10,
        ...Platform.select({
            ios: {
                width: 60,
                height: 60
            },
            android: {
                width: 68,
                height: 68
            },
        }),
    },
    idolName: {
        width: 80,
        textAlign:"center"
    },
    editBtn: {
        position: "absolute",
        top: 0,
        right: 15
    }
})
import React, { Component } from 'react'
import {Platform, Text, View, ListView, StyleSheet, Dimensions,TouchableOpacity, Image, FlatList } from 'react-native'

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

export default class MyIdol extends Component {
    constructor(props) {
        super(props);
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            idols : ['BTS','뉴이스트','트와이스','세븐틴','엑소','워너원','비투비']
            // idols : ds.cloneWithRows(['BTS','뉴이스트','트와이스','세븐틴','엑소','워너원','비투비'])            
        }
    }
    render() {
        return (
            <View style={styles.myIdol}>
                <Text style={styles.subTitle}>내 아이돌</Text>
                {/* <ListView
                    style={{paddingLeft: 5}}
                    horizontal="true"
                    showsHorizontalScrollIndicator={false}
                    dataSource={this.state.idols}
                    renderRow={(rowData)=><IdolCard name={rowData}></IdolCard>}
                >            
                </ListView> */}
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.idols}
                    renderItem={({item}) => {
                        return <IdolCard name={item}></IdolCard>
                    }}
                    keyExtractor={(item, index) => index.toString()} 
                >
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    myIdol: {
        height: 180,
        width: Dimensions.get('window').width,
        paddingLeft: 15
    },
    subTitle : {
        marginLeft: 12,
        marginBottom: 20,
        width: 80,
        fontWeight: '600',
        fontSize: 20
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
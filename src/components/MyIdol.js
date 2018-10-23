import React, { Component } from 'react'
import { Text, View, ListView, StyleSheet, Dimensions,TouchableOpacity, Image } from 'react-native'

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
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            idols : ds.cloneWithRows(['BTS','뉴이스트','트와이스','세븐틴','엑소','워너원','비투비'])            
        }
    }
    render() {
        return (
            <View style={styles.myIdol}>
                <Text style={styles.subTitle}>내 아이돌</Text>
                <ListView
                    style={{paddingLeft: 5}}
                    horizontal="true"
                    showsHorizontalScrollIndicator={false}
                    dataSource={this.state.idols}
                    renderRow={(rowData)=><IdolCard name={rowData}></IdolCard>}
                >            
                </ListView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    myIdol: {
        height: 180,
        width: Dimensions.get('window').width,
        // paddingLeft: 15
    },
    subTitle : {
        marginLeft: 15,
        marginBottom: 20,
        width: 80,
        fontWeight: '600',
        fontSize: 20
    },

    // idoncard
    idolCard: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 1
    },
    idolPhoto: {
        backgroundColor: '#dedede',
        borderRadius: 33,
        marginBottom:10,
        width: 60,
        height: 60
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
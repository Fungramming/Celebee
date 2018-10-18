import React, { Component } from 'react'
import { Text, View, ListView, StyleSheet, Dimensions,TouchableOpacity } from 'react-native'

class IdolCard extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.idolCard}>
                <Text style={styles.idolPhoto}></Text>
                <Text style={styles.idolName}>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}

export default class MyIdol extends Component {
    constructor() {
        super();
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
                horizontal="true"
                showsHorizontalScrollIndicator={false}
                dataSource={this.state.idols}
                renderRow={(rowData)=><IdolCard name={rowData}></IdolCard>}
            >            
            </ListView>
            <TouchableOpacity style={styles.editBtn}>
                <Text>편집</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    myIdol: {
        height: 180,
        width: Dimensions.get('window').width
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
        marginHorizontal: 5
    },
    idolPhoto: {
        backgroundColor: '#dedede',
        borderRadius: 50,
        marginBottom:10,
        width: 70,
        height: 70
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
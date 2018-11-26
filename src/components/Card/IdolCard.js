import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { addUserIdol } from "../../actions/users";

class SelectIdolList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userInfo: this.props.userInfo,    
      toggle: this.props.idolToggle,
    }
  }

  addUserIdol() {
    const btntoggle = !this.state.toggle
    this.setState({toggle: btntoggle})

    const followOrNot = this.state.toggle ? 1 : 0
    const id = this.props.id

    this.props.addIdol({
      followOrNot: followOrNot, 
      id: id, 
    })
  }

  render() {

    const {toggle} = this.state;
    const textValue = toggle ? "팔로우" : "팔로잉";
    const buttonBg = toggle ? styles.followBtn : styles.followingBtn

    return (
      <View style={styles.container}>
        <View style={styles.idolCard}>
          <Image
            source={require("../../../assets/user.png")}
            style={styles.idolPhoto}
          />
          <View style={styles.idolTextGroup}>
            <Text style={styles.idolName}>{this.props.name}</Text>
            <Text style={styles.followingNum}>{this.props.followNum}명이 팔로우합니다.</Text>
          </View>
          <View>
            <TouchableOpacity style={buttonBg} onPress={ () => this.addUserIdol() }>
              <Text style={{color:'#fff', fontSize: 16}}>{textValue}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    idolToggle: state.user.idolToggle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIdol: (userIdol) => {
      dispatch(addUserIdol(userIdol))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectIdolList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  idolCard: {
    flexDirection: 'row',
    marginBottom: 5
  },
  idolPhoto: {
      backgroundColor: '#dedede',
      borderRadius: 25,
      marginBottom: 10,
      marginRight: 15,
      width: 73,
      height: 73
  },
  idolTextGroup: {
    flexDirection: 'column',
    textAlign: "left",
    marginTop: 15,
    marginRight: 15,
    width: 140,
  },
  idolName: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 5
  },
  followingNum: {
    fontSize: 12,
  },
  followingBtn: {
    marginTop: 15,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: '#722784',
    borderRadius: 5,
  },
  followBtn: {
    marginTop: 15,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: '#dedede',
    borderRadius: 5,
  }
});
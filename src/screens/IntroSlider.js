import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage
} from "react-native";

import SplashScreen from 'react-native-splash-screen';
import AppIntroSlider from 'react-native-app-intro-slider';
import Login from './Login'

export default class IntroSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRealApp: false,
            };
        }

        _onDone = () => {
            this.setState({ showRealApp: true });
        };
        
        _onSkip = () => {
            this.setState({ showRealApp: true });
        }  
        
        // componentDidMount() {
        //     SplashScreen.hide();
        // }
        
        render() {
            // if(this.state.showRealApp) {
            // return (
            //     <Login />
            // );
            // } else {
                return (
                    <AppIntroSlider
                        slides={slides}
                        showSkipButton={true}
                        hideNextButton={true}
                        onDone={this._onDone}
                        onSkip={this._onSkip}
                        bottomButton
                        skipLabel='시작하기'
                        doneLabel='시작하기'
                        buttonStyle={styles.button}
                    />
                )
            // }
        }
}

const styles = StyleSheet.create({
    // Slider
    image: {
        width: 200,
        height: 200,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginTop: 16,
    },
    button: {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 15
    }
});

const slides = [
    {
        key: 's1',
        title: '셀',
        titleStyle: styles.title,
        text: '셀레비 어플입니다.',
        image: require('../../assets/logo_white.png'),
        imageStyle: styles.image,
        backgroundColor: '#722784', 
    },
    {
        key: 's2',
        title: '레',
        titleStyle: styles.title,
        text: '셀레비 어플입니다.',
        image: require('../../assets/logo_white.png'),
        imageStyle: styles.image,
        backgroundColor: '#722784',
    },
    {
        key: 's3',
        title: '비',
        titleStyle: styles.title,
        text: '셀레비 어플입니다.',
        image: require('../../assets/logo_white.png'),
        imageStyle: styles.image,
        backgroundColor: '#722784', 
    },
    {
        key: 's4',
        title: '어',
        titleStyle: styles.title,
        text: '셀레비 어플입니다.',
        image: require('../../assets/logo_white.png'),
        imageStyle: styles.image,
        backgroundColor: '#722784',
    },
    {
        key: 's5',
        title: '플',
        titleStyle: styles.title,
        text: '셀레비 어플입니다.',
        image: require('../../assets/logo_white.png'),
        imageStyle: styles.image,
        backgroundColor: '#722784',
    },
    {
        key: 's6',
        title: '!',
        titleStyle: styles.title,
        text: '셀레비 어플입니다.',
        image: require('../../assets/logo_white.png'),
        imageStyle: styles.image,
        backgroundColor: '#722784',
    },
];

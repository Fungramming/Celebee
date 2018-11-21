import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux'

import configureStore from '../../store'

const store = configureStore()

export function registerScreens() {
    // Navigation.registerComponentWithRedux('Initializing', () => require('./Initializing').default, Provider, store);
    Navigation.registerComponent('Initializing', () => require('./Initializing').default)
    Navigation.registerComponentWithRedux('Login', () => require('./Login').default, Provider, store);
    // Navigation.registerComponent('Login', () => require('./Login').default);
    Navigation.registerComponent('Schedule', () => require('./Schedule').default);
    Navigation.registerComponent('News', () => require('./News').default);
    Navigation.registerComponent('SelectIdol', () => require('./SelectIdol').default);
    Navigation.registerComponentWithRedux('SetNickname', () => require('./SetNickname').default, Provider, store);
}
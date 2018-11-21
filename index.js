/** @format */

// import {AppRegistry} from 'react-native';
// import React from 'react';
// import App from './App';
// import {name as appName} from './app.json';
// import {Provider} from 'react-redux'

// import configureStore from './store'

// const store = configureStore()

// const Celebee = () => (
//     <Provider store = { store }>
//         <App />
//     </Provider>
// )

// AppRegistry.registerComponent(appName, () => Celebee);




// import { Navigation } from "react-native-navigation";
// import App from './App'

// Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);

// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       component: {
//         name: "navigation.playground.WelcomeScreen"
//       }
//     }
//   });
// });




import { Navigation } from "react-native-navigation";
import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'

import configureStore from './store'

const store = configureStore()

const Celebee = () => (
    <Provider store = { store }>
        <App />
    </Provider>
)

import {registerScreens} from './src/screens';

registerScreens();

// AppRegistry.registerComponent(appName, () => Celebee);


// Navigation.registerComponent(`Celebee`, () => Celebee);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Initializing"
      }
    }
  });
});
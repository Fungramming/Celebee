import { Screens, AuthValid } from './screens/Navigation'
import configureStore from '../store'
// import { Navigation } from 'react-native-navigation/lib/dist/Navigation';
import {Navigation} from 'react-native-navigation';
import { Provider } from 'react-redux';

const store = configureStore()

// Register screens
Screens.forEach((SreenComponent, key)=> 
  Navigation.registerComponentWithRedux(key, () => SreenComponent, Provider, store)
); 


// Start application
Navigation.events().registerAppLaunchedListener(() => {
  AuthValid()
})
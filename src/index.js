import { Screens, LoginApp } from './screens'
import configureStore from '../store'
import { Navigation } from 'react-native-navigation/lib/dist/Navigation';
import { Provider } from 'react-redux';

const store = configureStore()

console.log('Screens :', Screens);
console.log('LoginApp :', LoginApp);
// Register screens
Screens.forEach((SreenComponent, key)=> 
  Navigation.registerComponentWithRedux(key, () => SreenComponent, Provider, store)
); 


// Start application
Navigation.events().registerAppLaunchedListener(() => {
  LoginApp()
})
import { Screens, AuthValid } from './screens/Navigation'
// import configureStore from '../store'
// import { Navigation } from 'react-native-navigation/lib/dist/Navigation';
import {Navigation} from 'react-native-navigation';
import { Provider } from 'react-redux';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import userReducer from './reducers/userReducer'
import rootSaga from './sagas'

const logger = createLogger(); 
const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  user: userReducer
});

const configureStore = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
)
sagaMiddleware.run(rootSaga)

const store = configureStore

// Register screens
Screens.forEach((SreenComponent, key)=> 
  Navigation.registerComponentWithRedux(key, () => SreenComponent, Provider, store)
); 


// Start application
Navigation.events().registerAppLaunchedListener(() => {
  AuthValid()
})



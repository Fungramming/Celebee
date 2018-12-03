import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './src/reducers/userReducer'
import { createLogger } from 'redux-logger';

const logger = createLogger(); 

const rootReducer = combineReducers({
    user: userReducer,
    auth: 'test'
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(logger));
}

export default configureStore
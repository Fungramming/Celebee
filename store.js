import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './src/reducers/userReducer'
import { createLogger } from 'redux-logger';
const rootReducer = combineReducers({
    user: userReducer
});

const logger = createLogger(); 
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(logger));
}

export default configureStore
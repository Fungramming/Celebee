import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './src/reducers/userReducer'
import feedReducer from './src/reducers/feedReducer'
import { createLogger } from 'redux-logger';

const logger = createLogger(); 

const rootReducer = combineReducers({
    user: userReducer,
    feed: feedReducer,
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(logger));
}

export default configureStore
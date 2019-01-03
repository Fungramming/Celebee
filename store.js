import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './src/reducers/userReducer'
import feedReducer from './src/reducers/feedReducer'
import { createLogger } from 'redux-logger';

const logger = createLogger(); 

const rootReducer = combineReducers({
<<<<<<< HEAD
    user: userReducer
=======
    user: userReducer,
    feed: feedReducer,
>>>>>>> 657c2071d28f0281104bacd8279e9ff56ed47f91
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(logger));
}

export default configureStore
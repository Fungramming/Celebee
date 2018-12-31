import { 
  config, 
  ASYNC_INIT_USER_INFO, 
  CHECK_USER_REQUEST, 
  CHECK_USER, 
  INIT_USER_INFO,  
  FETCH_USER_REQUEST, 
  FETCH_USER, 
  FETCH_IDOL_REQUEST, 
  FETCH_IDOL, 
} from '../actions/types'
import { call, put, takeLatest } from 'redux-saga/effects'

import Api from '../api'

function* FeedRequestSaga(action) {    
  console.log('userSaga this.props :', action);
  try {
      const payload = yield call(Api.fetchFeed, action.payload)
      yield put({type: CHECK_USER, payload})
  } catch (e) {

  }
}
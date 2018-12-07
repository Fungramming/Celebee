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

function* checkUserRequestSaga(action) {    
  console.log('userSaga this.props :', action);
  try {
      const payload = yield call(Api.checkUser, action.payload)
      yield put({type: CHECK_USER, payload})
  } catch (e) {

  }
}

function* fetchUserInfoRequestSaga(action) {
  try {                     
    const payload = yield call(Api.fetchUserInfo, action.payload)
    yield put({type: FETCH_USER, payload})
  } catch (e) {

  }
}

function* fetchIdolRequestSaga(action) {    
  try {                     
      const payload = yield call(Api.fetchIdol, action.payload)
      yield put({type: FETCH_IDOL, payload})
  } catch (e) {

  }
}

export const userSagas = [
  takeLatest(CHECK_USER_REQUEST, checkUserRequestSaga),
  takeLatest(FETCH_USER_REQUEST, fetchUserInfoRequestSaga),
  takeLatest(FETCH_IDOL_REQUEST, fetchIdolRequestSaga),
]
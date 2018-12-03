import { call, put, takeLatest } from 'redux-saga/effects'

import { UPDATE_USER_INFO, INIT_USER_INFO, ADD_USER_INFO_REQUEST, ADD_USER_INFO, FETCH_IDOL_REQUEST, FETCH_IDOL, ASYNC_INIT_USER_INFO, CHECK_USER, CHECK_USER_REQUEST } from '../actions/types'
import Api from '../api'

function* checkUserRequestSaga(action) {    
  try {                 
      console.log('action :', action);    
      const payload = yield call(Api.checkUser, action.payload)
      console.log('payload :', payload);
      yield put({type: CHECK_USER, payload})
  } catch (e) {
  }
}

function* fetchIdolRequestSaga(action) {    
  try {                     
      const payload = yield call(Api.fetchIdol, action.payload)
      console.log('payload :', payload);
      yield put({type: FETCH_IDOL, payload})
  } catch (e) {
  }
}

export const userSagas = [
  takeLatest(CHECK_USER_REQUEST, checkUserRequestSaga),
  takeLatest(FETCH_IDOL_REQUEST, fetchIdolRequestSaga),
]
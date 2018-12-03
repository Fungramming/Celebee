import { call, put, takeLatest } from 'redux-saga/effects'

import { UPDATE_USER_INFO, INIT_USER_INFO, ADD_USER_INFO_REQUEST, ADD_USER_INFO, FETCH_IDOL_REQUEST, ADD_USER_IDOL, ASYNC_INIT_USER_INFO } from '../actions/types'
import Api from '../api'

function* fetchIdolRequest(action) {    
  try {                     
      const payload = yield call(Api.fetchIdol, action.payload)
      yield put({type: ADD_USER_IDOL, payload})
  } catch (e) {
  }
}

export const userSagas = [
  takeLatest(FETCH_IDOL_REQUEST, fetchIdolRequest)
]

  

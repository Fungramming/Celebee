import { config, UPDATE_USER_INFO, INIT_USER_INFO, ADD_USER_INFO, FETCH_IDOL_REQUESTED, ADD_USER_IDOL, ASYNC_INIT_USER_INFO } from '../actions/types'
import Api from '../api'

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* fetchIdolRequest(action) {    
    console.log('action', action);
    try {                     
        const payload = yield call(Api.fetchIdol, action.payload)
        yield put({type: "ADD_USER_IDOL", payload})
    } catch (e) {
    }
 }
 

function* rootSaga() {
    yield takeLatest(FETCH_IDOL_REQUESTED, fetchIdolRequest);
  }
  
export default rootSaga;
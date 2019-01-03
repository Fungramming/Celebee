import { 
  config, 
  FETCH_FEED_REQUEST,
  FETCH_FEED
} from '../actions/types'
import { call, put, takeLatest } from 'redux-saga/effects'

import Api from '../api'

function* fetchFeedRequestSaga(action) {
  console.log('#$#@$@#$#@$@action', action)
  try {
      // const payload = yield call(Api.fetchFeed)
      const payload = yield call(Api.fetchFeed, action.payload)
      yield put({type: FETCH_FEED, payload})
      // yield put({type: FETCH_FEED})
  } catch (e) {

  }
}

export const feedSagas = [
  takeLatest(FETCH_FEED_REQUEST, fetchFeedRequestSaga),
]
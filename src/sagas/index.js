import { all } from 'redux-saga/effects'
import { userSagas } from './userSaga' 

function* rootSaga() {
    yield all([
              ...userSagas,
    ])
  }
  
export default rootSaga;
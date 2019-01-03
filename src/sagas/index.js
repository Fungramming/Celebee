import { all } from 'redux-saga/effects'
import { userSagas } from './userSaga' 
import { feedSagas } from './feedSaga' 

function* rootSaga() {
    yield all([
      ...userSagas,
      ...feedSagas,
    ])
  }
  
export default rootSaga;
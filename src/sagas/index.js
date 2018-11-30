import {INIT_USER_INFO, UPDATE_USER_INFO, ADD_USER_INFO, IDOL_FETCH_REQUESTED, ADD_USER_IDOL, ASYNC_INIT_USER_INFO} from '../actions/types'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {addUserIdol} from '../actions/users'

function* idolFetchRequest(action) {
    console.log('gogogogogo action :', action);

    fetch( config + 'user/follow/', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          follow: followOrNot,
          idol_id: id,
          token: this.state.token
      }),
    }).then((data) => {
        let result =  JSON.parse(data._bodyInit);   
        console.log('result@@@@ :', result);  
        this.setState(prevState => ({
          ...prevState,
          userInfo : result.result
        }))
        console.log('this.state. !@@@@@@@@@@@:', this.state);
        // this.props.addIdol(this.state.userInfo)
        
    }).catch((error) => {
        console.log('error :', error);
    });  

    // try {
    //    const user = yield call(addUserIdol, action.payload.userId);
    //    yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    // } catch (e) {
    //    yield put({type: "USER_FETCH_FAILED", message: e.message});
    // }
 }
 

function* rootSaga() {
    yield takeLatest("IDOL_FETCH_REQUESTED", idolFetchRequest);
  }
  
export default rootSaga;
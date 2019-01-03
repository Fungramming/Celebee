import { 
    FETCH_FEED_REQUEST,
    FETCH_FEED
} from '../actions/types'

const initialState = {
    "schedule": [
        {
            "date": "",
            "id": '',
            "idol_id": '',
            "news_feed": [],
            "regi_time": "",
            "sc_info": "",
            "sc_name": "",
            "video_feed": []
        },
    ],
}

const feedReducer = (state = initialState, action) => {
    switch(action.type) {
        //init 할때 두가지 경우가 있음 - 초기 로그인 - 두번째 로그인  이 두가지 경우는 서로 키 개수가 다르다.    
        case FETCH_FEED_REQUEST:
            console.log('@@@@@@@@@@@@@@@@@fetch request action', action)
            return {
                ...state,
            }
        case FETCH_FEED:
            console.log('@@@@@@@@@@@@@@@@@fetch action', action)
            return {
                ...state,
            }
        default:
            return state;    
    }
}

export default feedReducer;
import {
  FETCH_FEED_REQUEST,
  FETCH_FEED,
  FEED_LOGOUT
} from './types'

export const fetchFeed = feed => {
  return {
      type: FETCH_FEED,
      payload: feed
  }
}
export const fetchFeedRequest = feed => {
  return {
      type: FETCH_FEED_REQUEST,
      payload: feed
  }
}
export const feedLogout = feed => {
  return {
      type: FEED_LOGOUT,
      payload: feed
  }
}
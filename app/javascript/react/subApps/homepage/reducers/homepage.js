import {
  GET_FORUM_POSTS,
  GET_FORUM_POSTS_SUCCESS,
  GET_FORUM_POSTS_FAILURE
} from '../actions/getForumPosts'

import {
  GET_NEXT_EVENT,
  GET_NEXT_EVENT_SUCCESS,
  GET_NEXT_EVENT_FAILURE
} from '../actions/getNextEvent'

const initialState = {
  isFetchingForumPosts: false,
  isFetchingNextEvent: false,
  nextEvent: {},
  posts: []
}

const homepage = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORUM_POSTS:
      return { ...state, isFetchingForumPosts: true }
    case GET_FORUM_POSTS_SUCCESS:
      return { ...state,
        isFetchingForumPosts: false,
        posts: action.posts
      }
    case GET_FORUM_POSTS_FAILURE:
      return { ...state, isFetchingForumPosts: false }
    case GET_NEXT_EVENT:
      return { ...state, isFetchingNextEvent: true }
    case GET_NEXT_EVENT_SUCCESS:
      return { ...state,
        isFetchingNextEvent: false,
        nextEvent: action.nextEvent
      }
    case GET_NEXT_EVENT_FAILURE:
      return { ...state, isFetchingNextEvent: false }
    default:
      return state
  }
}

export default homepage

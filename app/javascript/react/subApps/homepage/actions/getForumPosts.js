import humps from 'humps'

const GET_FORUM_POSTS = 'GET_FORUM_POSTS'
const GET_FORUM_POSTS_SUCCESS = 'GET_FORUM_POSTS_SUCCESS'
const GET_FORUM_POSTS_FAILURE = 'GET_FORUM_POSTS_FAILURE'

export {
  GET_FORUM_POSTS,
  GET_FORUM_POSTS_SUCCESS,
  GET_FORUM_POSTS_FAILURE
}

const beginGettingForumPosts = () => {
  return {
    type: GET_FORUM_POSTS
  }
}

const getForumPostsSuccess = posts => {
  return {
    type: GET_FORUM_POSTS_SUCCESS,
    posts
  }
}

const getForumPostsFailure = () => {
  return {
    type: GET_FORUM_POSTS_FAILURE
  }
}

const getForumPosts = () => dispatch => {
  dispatch(beginGettingForumPosts())
  return fetch(`${process.env.FORUMS_URL}/posts.json`, {
    mode: 'cors'
  })
  .then(response => { return response.json() })
  .then(data => {
    const camelizedData = humps.camelizeKeys(data)
    dispatch(getForumPostsSuccess(camelizedData.latestPosts))
  })
  .catch(error => {
    dispatch(getForumPostsFailure())
  })
}

export {
  getForumPosts
}

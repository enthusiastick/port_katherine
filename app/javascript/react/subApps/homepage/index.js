import React from 'react'
import { connect } from 'react-redux'

import { getForumPosts } from './actions/getForumPosts'
import { getNextEvent } from './actions/getNextEvent'
import HomepageContainer from './containers/HomepageContainer'

const mapStateToProps = state => {
  return {
    isFetchingForumPosts: state.homepage.isFetchingForumPosts,
    nextEvent: state.homepage.nextEvent,
    posts: state.homepage.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForumPosts: () => dispatch(getForumPosts()),
    getNextEvent: () => dispatch(getNextEvent())
  }
}

const Homepage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomepageContainer)

export default Homepage

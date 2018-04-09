import React, { Component } from 'react'

import HomepageText from '../components/HomepageText'

class HomepageContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getNextEvent()
    if (this.props.posts.length === 0) {
      this.props.getForumPosts()
    }
  }

  render() {
    return(
      <HomepageText
        isFetchingForumPosts={this.props.isFetchingForumPosts}
        nextEvent={this.props.nextEvent}
        posts={this.props.posts}
      />
    )
  }
}

export default HomepageContainer

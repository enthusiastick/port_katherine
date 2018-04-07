import React, { Component } from 'react'

import HomepageText from '../components/HomepageText'

class HomepageContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getNextEvent()
  }

  render() {
    return <HomepageText nextEvent={this.props.nextEvent} />
  }
}

export default HomepageContainer

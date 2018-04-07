import React from 'react'
import { connect } from 'react-redux'

import { getNextEvent } from './actions/getNextEvent'
import HomepageContainer from './containers/HomepageContainer'

const mapStateToProps = state => {
  return {
    nextEvent: state.homepage.nextEvent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNextEvent: () => dispatch(getNextEvent())
  }
}

const Homepage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomepageContainer)

export default Homepage

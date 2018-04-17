import React, { Component } from 'react'
import { connect } from 'react-redux'

import EventsIndexContainer from '../containers/EventsIndexContainer'
import { getEvents } from '../actions/getEvents'

const mapStateToProps = state => {
  return {
    isFetchingEvents: state.events.isFetching,
    events: state.events.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => { dispatch(getEvents()) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsIndexContainer)

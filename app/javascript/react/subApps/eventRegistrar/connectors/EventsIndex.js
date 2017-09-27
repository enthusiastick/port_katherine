import React from 'react'
import { connect } from 'react-redux'

import EventsIndexContainer from '../containers/EventsIndexContainer'
import { getEvents } from '../actions/getEvents'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item,
    events: state.events.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => { dispatch(getEvents()) }
  }
}

const EventsIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsIndexContainer)

export default EventsIndex

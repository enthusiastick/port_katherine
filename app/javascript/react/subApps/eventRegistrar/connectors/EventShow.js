import React from 'react'
import { connect } from 'react-redux'

import EventShowContainer from '../containers/EventShowContainer'
import { deleteRegistration } from '../actions/deleteRegistration'
import { getEvents } from '../actions/getEvents'
import { eventBySlug } from '../selectors/events'

const mapStateToProps = (state, ownProps) => {
  return {
    event: eventBySlug(state, ownProps),
    eventSlug: ownProps.match.params.eventSlug
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteRegistration: (bookingId) => { dispatch(deleteRegistration(bookingId)) },
    getEvents: () => { dispatch(getEvents()) }
  }
}

const EventShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventShowContainer)

export default EventShow

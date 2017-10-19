import React from 'react'
import { connect } from 'react-redux'

import EventShowContainer from '../containers/EventShowContainer'
import { deleteRegistration } from '../actions/deleteRegistration'
import { getEvents } from '../actions/getEvents'

const mapStateToProps = (state, ownProps) => {
  let event = state.events.items.filter(event =>
    { if (event.slug === ownProps.match.params.eventSlug)
      { return event }
    }
  )[0]

  return {
    currentUser: state.currentUser.item,
    event: event,
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

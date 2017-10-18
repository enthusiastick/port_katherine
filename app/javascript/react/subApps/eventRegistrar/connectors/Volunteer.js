import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { getEvents } from '../actions/getEvents'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'

import VolunteerForm from '../forms/VolunteerForm'

const mapStateToProps = (state, ownProps) => {
  let event

  if (!state.events.isFetching) {
    event = state.events.items.filter(event =>
      { if (event.slug === ownProps.match.params.eventSlug)
        { return event }
      }
    )[0]
  }

  return {
    currentUser: state.currentUser.item,
    event: event
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearNotices: () => { dispatch(clearNotices()) },
    getEvents: () => { dispatch(getEvents()) },
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    push: (path) => { dispatch(push(path)) }
  }
}

const Volunteer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VolunteerForm)

export default Volunteer

import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EventShowContainer from '../containers/EventShowContainer'
import { getAdminEvents } from '../actions/getAdminEvents'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  let event = state.adminEvents.items.filter(event =>
    { if (event.slug == ownProps.match.params.eventSlug)
      { return event }
    }
  )[0]

  return {
    currentUser: state.currentUser.item,
    event: event,
    eventSlug: ownProps.match.params.eventSlug,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminEvents: () => { dispatch(getAdminEvents()) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminEventsShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventShowContainer)

export default AdminEventsShow

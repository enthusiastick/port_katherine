import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EventsIndexContainer from '../containers/EventsIndexContainer'
import { deleteAdminEvent } from '../actions/deleteAdminEvent'
import { getAdminEvents } from '../actions/getAdminEvents'
import { isAdmin, isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'

const mapStateToProps = state => {
  return {
    adminEvents: state.adminEvents.items,
    currentUser: state.currentUser.item,
    isCurrentUserAdmin: isAdmin(state),
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteAdminEvent: (eventSlug) => { dispatch(deleteAdminEvent(eventSlug)) },
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminEvents: () => { dispatch(getAdminEvents()) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminEventsIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsIndexContainer)

export default AdminEventsIndex


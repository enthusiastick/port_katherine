import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EventsIndexContainer from '../containers/EventsIndexContainer'
import { deleteAdminEvent } from '../actions/deleteAdminEvent'
import { getAdminEventsV2 } from '../actions/getAdminEventsV2'
import { isAdmin, isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'

const mapStateToProps = state => {
  return {
    adminEvents: state.adminEvents.index,
    currentUser: state.currentUser.item,
    isCurrentUserAdmin: isAdmin(state),
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteAdminEvent: (eventSlug) => { dispatch(deleteAdminEvent(eventSlug)) },
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminEventsV2: () => { dispatch(getAdminEventsV2()) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminEventsIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsIndexContainer)

export default AdminEventsIndex


import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EventReportsIndexContainer from '../containers/EventReportsIndexContainer'
import { adminEventBySlug } from '../selectors/adminEvents'
import { getAdminEvents } from '../actions/getAdminEvents'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    event: adminEventBySlug(state, ownProps),
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

const AdminEventReportsIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventReportsIndexContainer)

export default AdminEventReportsIndex
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EventReportsIndexContainer from '../containers/EventReportsIndexContainer'
import { adminEventBySlug } from '../selectors/adminEvents'
import { getAdminEvent } from '../actions/getAdminEvent'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.adminEvents.show,
    eventSlug: ownProps.match.params.eventSlug,
    isFetching: state.adminEvents.isFetching,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: notice => { dispatch(flashNotice(notice)) },
    getAdminEvent: slug => { dispatch(getAdminEvent(slug)) },
    push: path => { dispatch(push(path)) }
  }
}

const AdminEventReportsIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventReportsIndexContainer)

export default AdminEventReportsIndex

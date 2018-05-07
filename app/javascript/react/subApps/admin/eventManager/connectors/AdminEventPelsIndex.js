import React from 'react'
import { connect } from 'react-redux'

import EventPelsIndexContainer from '../containers/EventPelsIndexContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { getAdminEventPels } from '../actions/getAdminEventPels'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    eventPels: state.adminEvents.pels,
    eventSlug: ownProps.match.params.eventSlug,
    isFetchingPels: state.adminEvents.isFetchingPels,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => dispatch(authenticateSignedInPlotStaff(authorized)),
    getAdminEventPels: slug => dispatch(getAdminEventPels(slug))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPelsIndexContainer)

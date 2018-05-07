import React from 'react'
import { connect } from 'react-redux'

import EventPelShowContainer from '../containers/EventPelShowContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { getAdminEventPels } from '../actions/getAdminEventPels'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'
import { adminPelByUserHandle } from '../selectors/adminEvents'

const mapStateToProps = (state, ownProps) => {
  return {
    eventPels: state.adminEvents.pels,
    eventSlug: ownProps.match.params.eventSlug,
    isFetchingPels: state.adminEvents.isFetchingPels,
    isPlotStaff: isPlotStaff(state),
    pel: adminPelByUserHandle(state, ownProps),
    userHandle: ownProps.match.params.userHandle
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
)(EventPelShowContainer)

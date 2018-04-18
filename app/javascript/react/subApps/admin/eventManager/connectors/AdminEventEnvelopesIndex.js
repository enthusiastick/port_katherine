import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EventEnvelopesIndexContainer from '../containers/EventEnvelopesIndexContainer'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { getAdminEventEnvelopes } from '../actions/getAdminEventEnvelopes'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    eventEnvelopes: state.adminEvents.envelopes,
    eventSlug: ownProps.match.params.eventSlug,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminEventEnvelopes: (slug) => dispatch(getAdminEventEnvelopes(slug)),
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminEventEnvelopesIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventEnvelopesIndexContainer)

export default AdminEventEnvelopesIndex

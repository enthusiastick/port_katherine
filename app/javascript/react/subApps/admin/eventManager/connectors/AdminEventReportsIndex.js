import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { adminEventBySlug } from '../selectors/adminEvents'
import { getAdminEvents } from '../actions/getAdminEvents'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const EventReportsIndexContainer = props => {
  console.log(props)
  return <h1>Boo yaa</h1>
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.currentUser.item,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventReportsIndexContainer)

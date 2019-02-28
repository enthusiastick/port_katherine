import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EditEventForm from '../forms/EditEventForm'
import { getAdminEvent } from '../actions/getAdminEvent'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isAdmin } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.currentUser.item,
    event: state.adminEvents.show,
    eventSlug: ownProps.match.params.eventSlug,
    isAdmin: isAdmin(state),
    isFetching: state.adminEvents.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: notice => { dispatch(flashNotice(notice)) },
    getAdminEvent: slug => { dispatch(getAdminEvent(slug)) },
    push: path => { dispatch(push(path)) }
  }
}

const AdminEventEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEventForm)

export default AdminEventEdit

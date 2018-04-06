import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EditEventForm from '../forms/EditEventForm'
import { getAdminEvents } from '../actions/getAdminEvents'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isAdmin } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  let event = state.adminEvents.items.filter(event =>
    { if (event.slug == ownProps.match.params.eventSlug)
      { return event }
    }
  )[0]

  return {
    currentUser: state.currentUser.item,
    event: event,
    isAdmin: isAdmin(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminEvents: () => { dispatch(getAdminEvents()) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminEventEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEventForm)

export default AdminEventEdit

import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import NewEventForm from '../forms/NewEventForm'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isAdmin } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item,
    isAdmin: isAdmin(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminEventsNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEventForm)

export default AdminEventsNew

import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import NewEventForm from '../forms/NewEventForm'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item
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

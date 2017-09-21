import React from 'react'
import { connect } from 'react-redux'

import EventsIndexContainer from '../containers/EventsIndexContainer'
import { getAdminEvents } from '../actions/getAdminEvents'

const mapStateToProps = state => {
  return {
    adminEvents: state.adminEvents.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAdminEvents: () => { dispatch(getAdminEvents()) }
  }
}

const AdminEventsIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsIndexContainer)

export default AdminEventsIndex


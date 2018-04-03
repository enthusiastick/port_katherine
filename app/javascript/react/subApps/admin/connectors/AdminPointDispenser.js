import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { flashNotice } from '../../../sharedResources/actions/flashNotice'
import { getAdminUsers } from '../actions/getAdminUsers'

import AdminPointDispenserContainer from '../containers/AdminPointDispenserContainer'

const mapStateToProps = state => {
  return {
    adminUsers: state.adminUsers.items,
    currentUser: state.currentUser.item
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminUsers: () => { dispatch(getAdminUsers()) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminPointDispenser = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPointDispenserContainer)

export default AdminPointDispenser

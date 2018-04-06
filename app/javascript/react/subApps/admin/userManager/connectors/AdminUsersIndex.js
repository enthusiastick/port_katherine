import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AdminIndexContainer from '../containers/UsersIndexContainer'
import { getAdminUsers } from '../../actions/getAdminUsers'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    adminUsers: state.adminUsers.items,
    currentUser: state.currentUser.item,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminUsers: () => { dispatch(getAdminUsers()) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminUsersIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminIndexContainer)

export default AdminUsersIndex

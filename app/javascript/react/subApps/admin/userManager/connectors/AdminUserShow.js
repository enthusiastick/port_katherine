import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import UserShowContainer from '../containers/UserShowContainer'
import { getAdminUser } from '../actions/getAdminUser'

import { flashNotice } from '../../../../sharedResources/actions/flashNotice'

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.currentUser.item,
    user: state.adminUsers.show,
    userId: ownProps.match.params.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminUser: (id) => { dispatch(getAdminUser(id)) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminUserShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShowContainer)

export default AdminUserShow

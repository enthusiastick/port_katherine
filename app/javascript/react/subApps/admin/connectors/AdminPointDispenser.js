import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { flashNotice } from '../../../sharedResources/actions/flashNotice'

import AdminPointDispenserContainer from '../containers/AdminPointDispenserContainer'

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

const AdminPointDispenser = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPointDispenserContainer)

export default AdminPointDispenser

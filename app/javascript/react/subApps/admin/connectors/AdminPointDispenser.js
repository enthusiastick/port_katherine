import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { awardCP } from '../actions/awardCharacterPoints'
import { flashNotice } from '../../../sharedResources/actions/flashNotice'
import { isAdmin } from '../../../sharedResources/selectors/authorizeUser'

import AdminPointDispenserContainer from '../containers/AdminPointDispenserContainer'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item,
    isAdmin: isAdmin(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    awardCP: (values) => { dispatch(awardCP(values)) },
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminPointDispenser = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPointDispenserContainer)

export default AdminPointDispenser

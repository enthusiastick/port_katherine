import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AdminIndexCharactersContainer from '../containers/AdminIndexCharactersContainer'
import { getAdminCharacters } from '../actions/getAdminCharacters'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state) => {
  return {
    characters: state.adminCharacters.index,
    currentUser: state.currentUser.item,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminCharacters: () => { dispatch(getAdminCharacters()) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminIndexCharacters = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminIndexCharactersContainer)

export default AdminIndexCharacters

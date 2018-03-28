import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AdminIndexBackstoriesContainer from '../containers/AdminIndexBackstoriesContainer'
import { getAdminBackstories } from '../actions/getAdminBackstories'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'

const mapStateToProps = (state, ownProps) => {
  return {
    characterId: ownProps.match.params.characterId,
    backstories: state.adminCharacters.backstories,
    currentUser: state.currentUser.item
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminBackstories: (id) => { dispatch(getAdminBackstories(id)) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminIndexBackstories = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminIndexBackstoriesContainer)

export default AdminIndexBackstories

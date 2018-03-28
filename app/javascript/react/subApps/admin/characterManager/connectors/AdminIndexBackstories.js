import React from 'react'
import { connect } from 'react-redux'

import AdminIndexBackstoriesContainer from '../containers/AdminIndexBackstoriesContainer'
import { getAdminBackstories } from '../actions/getAdminBackstories'

const mapStateToProps = (state, ownProps) => {
  return {
    characterId: ownProps.match.params.characterId,
    backstories: state.adminCharacters.backstories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAdminBackstories: (id) => { dispatch(getAdminBackstories(id)) }
  }
}

const AdminIndexBackstories = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminIndexBackstoriesContainer)

export default AdminIndexBackstories

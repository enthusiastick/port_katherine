import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AdminCharacterBgsContainer from '../containers/AdminCharacterBgsContainer'
import { getAdminCharacterBgs } from '../actions/getAdminCharacterBgs'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    characterId: ownProps.match.params.characterId,
    bgs: state.adminCharacters.bgs,
    currentUser: state.currentUser.item,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getAdminBgs: (id) => { dispatch(getAdminCharacterBgs(id)) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminCharacterBgs = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCharacterBgsContainer)

export default AdminCharacterBgs

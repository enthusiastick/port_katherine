import { connect } from 'react-redux'

import AdminCharacterLocksContainer from '../containers/AdminCharacterLocksContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { editCharacter } from '../../../../subApps/characterBuilder/actions/editCharacter'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    character: state.characters.edit,
    characterId: ownProps.match.params.characterId,
    isFetching: state.characters.isFetching,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    editCharacter: characterId => { dispatch(editCharacter(characterId)) }
  }
}

const AdminCharacterLocks = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCharacterLocksContainer)

export default AdminCharacterLocks

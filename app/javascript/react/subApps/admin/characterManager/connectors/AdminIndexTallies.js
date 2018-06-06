import { connect } from 'react-redux'

import AdminIndexTalliesContainer from '../containers/AdminIndexTalliesContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { getTallies } from '../../../../sharedResources/actions/getTallies'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    characterId: ownProps.match.params.characterId,
    tallies: state.characters.tallies,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    getTallies: characterId => { dispatch(getTallies(characterId)) }
  }
}

const AdminIndexTallies = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminIndexTalliesContainer)

export default AdminIndexTallies

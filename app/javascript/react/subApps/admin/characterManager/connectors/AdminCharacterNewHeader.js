import { connect } from 'react-redux'

import AdminCharacterNewHeaderContainer from '../containers/AdminCharacterNewHeaderContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { createAdminCharacterHeader } from '../actions/createAdminCharacterHeader'
import { getAdminAvailableHeaders } from '../actions/getAdminCharacterAvailableHeaders'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    characterId: ownProps.match.params.characterId,
    headers: state.adminCharacterOptions.headers.items,
    isFetching: state.adminCharacterOptions.isFetching,
    isPlotStaff: isPlotStaff(state),
    meta: state.adminCharacterOptions.headers.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    createAdminCharacterHeader: values => { dispatch(createAdminCharacterHeader(values)) },
    getAdminAvailableHeaders: characterId => { dispatch(getAdminAvailableHeaders(characterId)) }
  }
}

const AdminCharacterNewHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCharacterNewHeaderContainer)

export default AdminCharacterNewHeader

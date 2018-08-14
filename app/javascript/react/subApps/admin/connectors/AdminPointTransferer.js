import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { authenticateSignedInPlotStaff } from '../../../sharedResources/actions/authenticateUser'
import { isAdmin } from '../../../sharedResources/selectors/authorizeUser'

import AdminPointTransfererContainer from '../containers/AdminPointTransfererContainer'

const mapStateToProps = state => {
  return {
    isAdmin: isAdmin(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInAdmin: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) }
  }
}

const AdminPointTransferer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPointTransfererContainer)

export default AdminPointTransferer

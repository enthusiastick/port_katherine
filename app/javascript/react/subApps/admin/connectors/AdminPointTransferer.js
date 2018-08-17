import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { transferCP } from '../actions/transferCharacterPoints'
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
    authenticateSignedInAdmin: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    transferCP: (values, resetForm, setSubmitting) => { dispatch(transferCP(values, resetForm, setSubmitting)) }
  }
}

const AdminPointTransferer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPointTransfererContainer)

export default AdminPointTransferer

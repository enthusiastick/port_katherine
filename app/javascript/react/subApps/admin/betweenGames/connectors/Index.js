import { connect } from 'react-redux'

import BgsIndexContainer from '../containers/IndexContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { getAdminBgs } from '../actions/getAdminBgs'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'
import { bgsAssignedToCurrentUser, bgsUnassigned } from '../selectors/bgs'

const mapStateToProps = (state, ownProps) => {
  return {
    allBgs: state.adminBgs.index,
    bgsAssignedToCurrentUser: bgsAssignedToCurrentUser(state),
    bgsUnassigned: bgsUnassigned(state),
    isFetching: state.adminBgs.isFetching,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    getAdminBgs: () => { dispatch(getAdminBgs()) }
  }
}

const AdminBgsIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(BgsIndexContainer)

export default AdminBgsIndex

import { connect } from 'react-redux'

import BgsShowContainer from '../containers/ShowContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { showAdminBgs } from '../actions/showAdminBgs'
import { updateAdminBgsAssignee } from '../actions/updateAdminBgsAssignee'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    bgs: state.adminBgs.show,
    bgsId: ownProps.match.params.bgsId,
    hasUpdatedAssignee: state.adminBgs.hasUpdatedAssignee,
    meta: state.adminBgs.meta,
    isFetching: state.adminBgs.isFetching,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    showAdminBgs: id => { dispatch(showAdminBgs(id)) },
    updateAdminBgsAssignee: values => { dispatch(updateAdminBgsAssignee(values)) }
  }
}

const AdminBgsShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(BgsShowContainer)

export default AdminBgsShow

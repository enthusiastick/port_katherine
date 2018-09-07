import { connect } from 'react-redux'

import HeaderShowContainer from '../containers/HeaderShowContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { showAdminHeader } from '../actions/showAdminHeader'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.adminHeaders.isFetching,
    isPlotStaff: isPlotStaff(state),
    header: state.adminHeaders.show,
    headerId: ownProps.match.params.headerId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    showAdminHeader: id => { dispatch(showAdminHeader(id)) }
  }
}

const HeaderShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderShowContainer)

export default HeaderShow

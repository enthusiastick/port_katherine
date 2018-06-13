import { connect } from 'react-redux'

import EventMerchantsIndexContainer from '../containers/EventMerchantsIndexContainer'

import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { getAdminEventMerchants } from '../actions/getAdminEventMerchants'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    eventMerchants: state.adminEvents.merchants,
    eventSlug: ownProps.match.params.eventSlug,
    isFetchingMerchants: state.adminEvents.isFetchingMerchants,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    getAdminEventMerchants: slug => { dispatch(getAdminEventMerchants(slug)) }
  }
}

const AdminEventMerchantsIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMerchantsIndexContainer)

export default AdminEventMerchantsIndex

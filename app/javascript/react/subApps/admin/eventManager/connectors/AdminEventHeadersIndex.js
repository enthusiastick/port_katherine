import { connect } from 'react-redux'

import EventHeadersIndexContainer from '../containers/EventHeadersIndexContainer'

import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { getAdminEventHeaders } from '../actions/getAdminEventHeaders'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    eventHeaders: state.adminEvents.headers,
    eventSlug: ownProps.match.params.eventSlug,
    isFetchingHeaders: state.adminEvents.isFetchingHeaders,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    getAdminEventHeaders: (eventSlug, headerId) => { dispatch(getAdminEventHeaders(eventSlug, headerId)) }
  }
}

const AdminEventHeadersIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventHeadersIndexContainer)

export default AdminEventHeadersIndex

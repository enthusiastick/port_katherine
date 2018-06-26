import { connect } from 'react-redux'

import EventHeadersIndexContainer from '../containers/EventHeadersIndexContainer'

import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { getAdminEventHeaders } from '../actions/getAdminEventHeaders'
import { getHeaders } from '../../../../sharedResources/actions/getHeaders'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    eventHeaders: state.adminEvents.headers,
    eventSlug: ownProps.match.params.eventSlug,
    headers: state.headers.item,
    isFetchingHeaders: state.adminEvents.isFetchingHeaders,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    getHeaders: () => { dispatch(getHeaders()) },
    getAdminEventHeaders: (eventSlug, headerId) => { dispatch(getAdminEventHeaders(eventSlug, headerId)) }
  }
}

const AdminEventHeadersIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventHeadersIndexContainer)

export default AdminEventHeadersIndex

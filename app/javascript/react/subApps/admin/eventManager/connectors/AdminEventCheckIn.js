import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EventCheckInContainer from '../containers/EventCheckInContainer'
import { adminEventBySlug } from '../selectors/adminEvents'
import { createCheckIn } from '../actions/createCheckIn'
import { getAdminEvents } from '../actions/getAdminEvents'
import { flashNotice } from '../../../../sharedResources/actions/flashNotice'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    event: adminEventBySlug(state, ownProps),
    eventSlug: ownProps.match.params.eventSlug,
    isFetching: state.adminEvents.isFetching,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCheckIn: values => { dispatch(createCheckIn(values)) },
    flashNotice: notice => { dispatch(flashNotice(notice)) },
    getAdminEvents: () => { dispatch(getAdminEvents()) },
    push: path => { dispatch(push(path)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCheckInContainer)

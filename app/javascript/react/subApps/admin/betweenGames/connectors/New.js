import { connect } from 'react-redux'

import BgsNewContainer from '../containers/NewContainer'
import { createAdminBgs } from '../actions/createAdminBgs'
import { getAdminEvent } from '../../eventManager/actions/getAdminEvent'
import { getAdminEventsV2 } from '../../eventManager/actions/getAdminEventsV2'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'
import { upcomingEvents } from '../selectors/adminEvents'

const mapStateToProps = state => ({
  event: state.adminEvents.show,
  events: upcomingEvents(state),
  isPlotStaff: isPlotStaff(state)
})

const mapDispatchToProps = dispatch => ({
  authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
  createAdminBgs: values => { dispatch(createAdminBgs(values)) },
  getAdminEvent: slug => { dispatch(getAdminEvent(slug)) },
  getAdminEventsV2: () => { dispatch(getAdminEventsV2()) }
})

const AdminBgsNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(BgsNewContainer)

export default AdminBgsNew

import { connect } from 'react-redux'

import BgsNewContainer from '../containers/NewContainer'
import { createAdminBgs } from '../actions/createAdminBgs'
import { getAdminEvent } from '../../eventManager/actions/getAdminEvent'
import { getAdminEventsV2 } from '../../eventManager/actions/getAdminEventsV2'

const mapStateToProps = state => ({
  event: state.adminEvents.show,
  events: state.adminEvents.index.upcoming
})

const mapDispatchToProps = dispatch => ({
  createAdminBgs: values => { dispatch(createAdminBgs(values)) },
  getAdminEvent: slug => { dispatch(getAdminEvent(slug)) },
  getAdminEventsV2: () => { dispatch(getAdminEventsV2()) }
})

const AdminBgsNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(BgsNewContainer)

export default AdminBgsNew

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { flashNotice } from '../../../sharedResources/actions/flashNotice'
import { isPlotStaff } from '../../../sharedResources/selectors/authorizeUser'

import AdminIndexContainer from '../containers/AdminIndexContainer'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item,
    isPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return{
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    push: (path) => { dispatch(push(path)) }
  }
}

const AdminIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminIndexContainer)

export default AdminIndex

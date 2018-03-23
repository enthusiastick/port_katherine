import React from 'react'
import { connect } from 'react-redux'

import Navigation from '../containers/Navigation'
import { getCurrentUser } from '../../../sharedResources/actions/getCurrentUser'
import { isPlotStaff } from '../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item,
    isCurrentUserPlotStaff: isPlotStaff(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => { dispatch(getCurrentUser()) }
  }
}

const NavigationBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default NavigationBar

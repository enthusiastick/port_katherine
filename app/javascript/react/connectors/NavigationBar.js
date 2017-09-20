import React from 'react'
import { connect } from 'react-redux'

import Navigation from '../containers/Navigation'
import { getCurrentUser } from '../actions/getCurrentUser'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item
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

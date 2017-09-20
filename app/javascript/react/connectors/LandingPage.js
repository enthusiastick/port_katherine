import React from 'react'
import { connect } from 'react-redux'

import Welcome from '../components/Welcome'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item
  }
}

const LandingPage = connect(
  mapStateToProps
)(Welcome)

export default LandingPage

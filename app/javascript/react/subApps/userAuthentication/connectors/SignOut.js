import React, { Component } from 'react'
import { connect } from 'react-redux'

import { destroySession } from '../actions/destroySession'
import { getCurrentUser } from '../../../sharedResources/actions/getCurrentUser'
import { flashNotice } from '../../../sharedResources/actions/flashNotice'
import { push } from 'react-router-redux'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item
  }
}

const mapDispatchToProps = dispatch => {
  return {
    destroySession: () => { dispatch(destroySession()) },
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getCurrentUser: () => { dispatch(getCurrentUser()) },
    push: (path) => { dispatch(push(path)) }
  }
}

class SignOutContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.currentUser.id) {
      this.props.destroySession()
      this.props.push('/')
      this.props.flashNotice({ success: 'Signed out.' })
    } else {
      this.props.push('/')
      this.props.flashNotice({ alert: 'You are not signed in.' })
    }
  }

  render() { return null }
}

const SignOut = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOutContainer)

export default SignOut

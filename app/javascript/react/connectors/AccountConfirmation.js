import queryString from 'query-string'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createAccountConfirmation } from '../actions/createAccountConfirmation'

const mapStateToProps = (state, ownProps) => {
  return Object.assign(
    {},
    queryString.parse(state.router.location.search),
    {
      accountConfirmed: state.currentUser.accountConfirmed,
      confirmationToken: ownProps.match.params.confirmationToken
    }
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createAccountConfirmation: (values) => { dispatch(createAccountConfirmation(values)) }
  }
}

class AccountConfirmationContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    return this.props.createAccountConfirmation(
      {
        confirmationToken: this.props.confirmationToken,
        email: this.props.email
      }
    )
  }

  render() { return null }
}

const AccountConfirmation = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountConfirmationContainer)

export default AccountConfirmation

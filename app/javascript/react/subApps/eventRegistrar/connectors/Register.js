import queryString from 'query-string'
import React from 'react'
import { connect } from 'react-redux'

import { getEvents } from '../actions/getEvents'
import RegistrationForm from '../forms/RegistrationForm'

const mapStateToProps = (state, ownProps) => {
  let event, pass

  if (!state.events.isFetching) {
    event = state.events.items.filter(event =>
      { if (event.slug === ownProps.match.params.eventSlug)
        { return event }
      }
    )[0]
  }

  if (state.router.location.search) {
    pass = queryString.parse(state.router.location.search).pass
  }

  return {
    currentUser: state.currentUser.item,
    event: event,
    pass: pass
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => { dispatch(getEvents()) }
  }
}

const Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)

export default Register

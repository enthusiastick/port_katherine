import queryString from 'query-string'
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { change } from 'redux-form'

import { getEvents } from '../actions/getEvents'
import { getToken } from '../actions/getToken'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'
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
    pass: pass,
    token: state.token.item
  }
}

const mapDispatchToProps = dispatch => {
  return {
    change: (form, field, value) => { dispatch(change(form, field, value)) },
    clearNotices: () => { dispatch(clearNotices()) },
    getEvents: () => { dispatch(getEvents()) },
    getToken: () => { dispatch(getToken()) },
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    push: (path) => { dispatch(push(path)) }
  }
}

const Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)

export default Register

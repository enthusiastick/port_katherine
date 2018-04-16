import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import LodgingQuestionnaireContainer from '../containers/LodgingQuestionnaireContainer'
import { isSignedIn } from '../../../sharedResources/selectors/authorizeUser'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'
import { answerLodgingQuestionnaire } from '../actions/answerLodgingQuestionnaire'
import { getEvents } from '../actions/getEvents'

const mapStateToProps = (state, ownProps) => {
  const filteredEvent = state.events.items.filter(event =>
    { if (event.slug === ownProps.match.params.eventSlug)
      { return event }
    }
  )[0]

  let event = {}
  if (filteredEvent) { event = filteredEvent }

  return {
    currentUser: state.currentUser.item,
    event: event,
    eventSlug: ownProps.match.params.eventSlug,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    answerLodgingQuestionnaire: (values) => {
      dispatch(answerLodgingQuestionnaire(values))
      .catch(error => {
        dispatch(clearNotices())
        dispatch(flashNotice({ alert: error }))
      })
    },
    flashNotice: (notice) => { dispatch(flashNotice(notice)) },
    getEvents: () => { dispatch(getEvents()) },
    push: (path) => { dispatch(push(path)) }
  }
}

const LodgingQuestionnaire = connect(
  mapStateToProps,
  mapDispatchToProps
)(LodgingQuestionnaireContainer)

export default LodgingQuestionnaire

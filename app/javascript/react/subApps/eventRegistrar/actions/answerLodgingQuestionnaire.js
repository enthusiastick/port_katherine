import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'
import { getEvents } from '../actions/getEvents'

const ANSWER_LODGING_QUESTIONNAIRE = 'ANSWER_LODGING_QUESTIONNAIRE'
const ANSWER_LODGING_QUESTIONNAIRE_SUCCESS = 'ANSWER_LODGING_QUESTIONNAIRE_SUCCESS'
const ANSWER_LODGING_QUESTIONNAIRE_FAILURE = 'ANSWER_LODGING_QUESTIONNAIRE_FAILURE'

export {
  ANSWER_LODGING_QUESTIONNAIRE,
  ANSWER_LODGING_QUESTIONNAIRE_SUCCESS,
  ANSWER_LODGING_QUESTIONNAIRE_FAILURE
}

const fetchAnswerLodgingQuestionnaire = () => {
  return {
    type: ANSWER_LODGING_QUESTIONNAIRE
  }
}

const answerLodgingQuestionnaireSuccess = payload => {
  return {
    type: ANSWER_LODGING_QUESTIONNAIRE_SUCCESS,
    payload
  }
}

const answerLodgingQuestionnaireFailure = () => {
  return {
    type: ANSWER_LODGING_QUESTIONNAIRE_FAILURE
  }
}

const answerLodgingQuestionnaire = values => dispatch => {
  dispatch(fetchAnswerLodgingQuestionnaire())
  const payload = JSON.stringify(humps.decamelizeKeys({lodgingQuestionnaire: values}))
  return fetch(`${baseUrl}/api/v1/lodging_questionnaires.json`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      const response = humps.camelizeKeys(data)
      dispatch(answerLodgingQuestionnaireSuccess(response))
      dispatch(getEvents())
      dispatch(clearNotices())
      dispatch(flashNotice({ success: 'Your lodging preferences have been recorded.' }))
      dispatch(push('/events'))
    }
    return data
  })
  .catch(errors => {
    dispatch(answerLodgingQuestionnaireFailure())
    throw errors
  })
}

export {
  answerLodgingQuestionnaire
}

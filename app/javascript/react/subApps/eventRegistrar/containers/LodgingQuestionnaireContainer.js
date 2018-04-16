import React, { Component } from 'react'
import { Formik } from 'formik'

import LodgingQuestionnaireForm from '../forms/LodgingQuestionnaireForm'

import authenticateUser from '../../../sharedResources/constants/authenticateUser'
import authorizeUserLodgingQuestionnaire from '../constants/authorizeUserLodgingQuestionnaire'

class LodgingQuestionnaireContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug != this.props.event.slug) {
      this.props.getEvents()
    }
  }

  componentWillReceiveProps(nextProps) {
    authenticateUser(nextProps.isSignedIn, this.props.push, this.props.flashNotice)
    authorizeUserLodgingQuestionnaire(nextProps.authorizedForLodgingQuestionnaire, this.props.push, this.props.flashNotice)
  }

  validate(values) {
    const { favoredUsers, undesirableUsers } = values
    const favoredUserHandles = favoredUsers.map(user => user.value)
    const undesirableUserHandles = undesirableUsers.map(user => user.value)
    let errors = {}

    const commonUserHandles = favoredUserHandles.filter(handle => {
      return undesirableUserHandles.includes(handle)
    })

    if (commonUserHandles.length != 0) {
      errors.undesirableUsers = 'The same user should not appear in both lists.'
    }

    return errors
  }

  render() {
    const initialValues = {
      comments: '',
      eventSlug: this.props.eventSlug,
      favoredUsers: [],
      tenting: false,
      undesirableUsers: []
    }

    const handleSubmit = (values) => {
      this.props.answerLodgingQuestionnaire(values)
    }

    const { name } = this.props.event

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>{name} Lodging Questionnaire</h1>
          <Formik
            component={LodgingQuestionnaireForm}
            eventSlug={this.props.event.slug}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={this.validate}
          />
        </div>
      </div>
    )
  }
}

export default LodgingQuestionnaireContainer

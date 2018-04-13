import React, { Component } from 'react'
import { Formik } from 'formik'

import LodgingSurveyForm from '../forms/LodgingSurveyForm'

import authenticateUser from '../../characterBuilder/constants/authenticateUser'

class LodgingSurveyContainer extends Component {
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
  }

  validate(values) {
    let errors = {}

    console.log(values)

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
      debugger
    }

    const { name } = this.props.event

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>{name} Lodging Questionnaire</h1>
          <Formik
            component={LodgingSurveyForm}
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

export default LodgingSurveyContainer

import React, { Component } from 'react'
import { Formik } from 'formik'

import FeedbackEditForm from '../forms/FeedbackEditForm'

class FeedbackEditContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!this.props.booking.id) {
      this.props.getBetweenGames()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInUser(nextProps.isSignedIn)
  }

  render() {
    const { booking, createFeedback, isFetching } = this.props
    const { id, feedback, label } = booking

    if (!feedback) {
      if (isFetching) {
        return(
            <div className='text-center top-padded'>
              <i className='fa fa-spinner fa-pulse fa-3x fa-fw' />
            </div>
          )
      }

      return null
    }

    const initialValues = {
      booking: id,
      feedback
    }

    const handleSubmit = (values) => {
      createFeedback(values)
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Edit {label} PEL</h1>
          <Formik
            component={FeedbackEditForm}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    )
  }
}

export default FeedbackEditContainer

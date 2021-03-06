import React, { Component } from 'react'
import { Formik } from 'formik'

import { default as FeedbackForm } from '../../forms/Feedback'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class FeedbackNewContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.feedbackEligibleBookings.length === 0) {
      this.props.getBetweenGames()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInUser(nextProps.isSignedIn)
  }

  render() {
    const { feedbackEligibleBookings, createFeedback, isFetching } = this.props

    if (feedbackEligibleBookings.length === 0) {
      if (isFetching) {
        return <LoadingSpinner />
      }

      return(
        <h1 className='text-center top-padded'>
          No eligible events found.
        </h1>
      )
    }

    const initialValues = {
      booking: feedbackEligibleBookings[0].id,
      feedback: 'Event Rating [from 1 to 10]:\n\n### Things I Liked\nTell us what you liked! :)\n\n### Things I Didn\'t Like\nTell us what you *didn\'t* like. :(\n\n### Journal or Event History\nFrom an in-game or out-of-game perspective.\n\n### Some Things Staff Probably Doesn\'t Know (But Should)\n- We\'re human, we miss things.\n- Tell us about your experience.'
    }

    const handleSubmit = values => {
      createFeedback(values)
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Submit a PEL</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={formikProps => (
              <FeedbackForm
                bookings={feedbackEligibleBookings}
                {...formikProps}
              />
            )}
          />
        </div>
      </div>
    )
  }
}

export default FeedbackNewContainer

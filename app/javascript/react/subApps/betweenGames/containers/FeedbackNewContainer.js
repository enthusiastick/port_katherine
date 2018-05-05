import React, { Component } from 'react'
import { Formik } from 'formik'

import { default as FeedbackForm } from '../forms/Feedback'

class FeedbackNewContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.bookings.length === 0) {
      this.props.getBetweenGames()
    }
  }

  render() {
    const { bookings } = this.props

    const initialValues = {
      booking: '',
      feedback: 'blah'
    }

    const handleSubmit = (values) => {
      debugger
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
                bookings={bookings}
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

import React, { Component } from 'react'
import { Formik } from 'formik'

import { default as BgsForm } from '../../forms/Bgs'
import validateBgs from '../../constants/validateBgs'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class BgsNewContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.bgsEligibleBookings.length === 0) {
      this.props.getBetweenGames()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInUser(nextProps.isSignedIn)
  }

  render() {
    const { bgsEligibleBookings, createBgs, isFetching } = this.props

    if (bgsEligibleBookings.length === 0) {
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
      bookingId: bgsEligibleBookings[0].id,
      body: '',
      category: 'miscellaneous',
      title: ''
    }

    const handleSubmit = values => {
      createBgs(values)
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>New Between-Game Skill Submission</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validateBgs}
            render={formikProps => (
              <BgsForm
                bookings={bgsEligibleBookings}
                {...formikProps}
              />
            )}
          />
        </div>
      </div>
    )
  }
}

export default BgsNewContainer

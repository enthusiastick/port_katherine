import React, { Component } from 'react'
import { Formik } from 'formik'

import { default as BgsForm } from '../../forms/Bgs'
import validateBgs from '../../constants/validateBgs'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class BgsEditContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.bgsEligibleBookings.length === 0) {
      this.props.getBetweenGames()
    }
    if (this.props.bgsId !== this.props.bgs.id) {
      this.props.getBgs(this.props.bgsId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInUser(nextProps.isSignedIn)
  }

  render() {
    const { bgsEligibleBookings, bgs, bgsId, isFetching, updateBgs } = this.props
    const { body, bookingId, category, isDeadlinePast, title } = bgs

    if (!this.props.bgs.id && isFetching) { return <LoadingSpinner /> }
    if (isDeadlinePast) { return <LoadingSpinner /> }

    const initialValues = {
      id: bgsId,
      bookingId,
      body,
      category,
      title
    }

    const handleSubmit = values => {
      updateBgs(values)
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Edit Between-Game Skill Submission</h1>
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

export default BgsEditContainer

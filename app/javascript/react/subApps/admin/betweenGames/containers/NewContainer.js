import React, { Component } from 'react'
import { Formik } from 'formik'

import BgsForm from '../forms/bgs/Base'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class BgsNewContainer extends Component {
  constructor(props) {
    super(props)
    this.handleEventChange = this.handleEventChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (this.props.events.length === 0) {
      this.props.getAdminEventsV2()
    }
  }

  handleEventChange(eventSlug) {
    this.props.getAdminEvent(eventSlug)
  }

  handleSubmit(values) {
    console.log(values)
  }

  render() {
    const { event, events } = this.props

    if (events.length === 0) { return <LoadingSpinner /> }

    const initialValues = {
      body: '',
      character: {},
      event: {},
      title: ''
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>New BGS</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            render={formikProps => (
              <BgsForm
                events={events.map(event => ({ label: event.name, value: event.slug }))}
                handleEventChange={this.handleEventChange}
                fetchedEvent={event}
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

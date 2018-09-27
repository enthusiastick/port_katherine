import React, { Component } from 'react'
import { Field } from 'redux-form'

import TextArea from '../../../sharedResources/components/formFields/TextArea'

class VolunteerFormContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug && !this.props.event) {
      this.props.getEvents()
    }

    if (this.props.event && !this.props.currentUser.id) {
      this.props.clearNotices()
      this.props.flashNotice({ alert: 'You must be signed in to volunteer.' })
      this.props.push('/sign-in')
    }

    if (this.props.event && !this.props.event['registerable?']) {
      this.props.clearNotices()
      this.props.flashNotice({ alert: 'Volunteer sign-ups for this event is not currently available.' })
      this.props.push('/events')
    }

    if (this.props.event && this.props.event.userBooking) {
      this.props.clearNotices()
      this.props.flashNotice({ alert: 'You are already registered for this event.' })
      this.props.push('/events')
    }
  }

  render() {
    let { submitting } = this.props
    let heading

    if (this.props.event) {
      heading = `Volunteer for ${this.props.event.name}`
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>
            {heading}
          </h1>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-inputs'>
              <Field
                name='userSelfReport'
                label='Food allergies and other information'
                component={TextArea}
              />
            </div>
            <div className='form-actions'>
              <button className='button' disabled={submitting} type='submit'>Volunteer</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default VolunteerFormContainer
